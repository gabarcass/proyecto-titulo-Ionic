import { Component, OnInit } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'
import { FormBuilder, Validators } from '@angular/forms'
import { ChildrenService } from 'services/children.service'
import { ArchivoService } from 'services/archivo.service';
import { UserService } from 'services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-tutor',
  templateUrl: './modal-tutor.component.html',
  styleUrls: ['./modal-tutor.component.scss'],
})
export class ModalTutorComponent implements OnInit {
  datos
  form
  formSend
  tipo
  myphoto
  constructor(private childrenSrv: ChildrenService,
    private formBuilder: FormBuilder,
    public modal: ModalController,
    public navParams: NavParams,
    public archivoSrv: ArchivoService,
    private userSrv: UserService,
    public camera: Camera,

  ) {
    this.datos = this.navParams
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      parentesco: ['', Validators.required],
      fotografia: ['', Validators.required]

    })
  }
  ngOnInit() {
    if (this.datos.get('nombre')) {
      let edit = {
        'nombre': this.datos.get('nombre'),
        'rut': this.datos.get('rut'), 'parentesco': this.datos.get('parentesco'),
        'fotografia': this.datos.get('fotografia')
      }
      this.form.patchValue(edit)
      this.tipo = 'edit'
    } else this.tipo = 'new'
    console.log(this.tipo)

  }

  send() {
    console.log(this.tipo)
    if (this.validator()) {
      if (this.tipo == 'new') {
        this.userSrv.postTutor(this.formSend)
          .subscribe(result => {
            if (result) {
              alert("Se registro correctamente el tutor.")
              this.dismiss()
            } else alert("Intentelo más tarde")
          })
      } else {
        this.formSend['id'] = this.datos.get('id')
        this.userSrv.editTutor(this.formSend)
          .subscribe(result => {
            if (result) {
              alert("Se edito correctamente el tutor.")
              this.dismiss()
            } else alert("Intentelo más tarde")
          })
      }
    } else alert("Complete todos los campos")
  }

  validator() {
    if (this.form.valid) {
      this.formSend = this.form.value
      this.formSend['id_parvulo'] = this.datos.get('id_parvulo')
      return true
    } else false
  }

  dismiss() {
    console.log('dismiss!!!')
    this.modal.dismiss()
  }
  choose() {
    const option: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    console.log("hola")

    this.camera.getPicture(option).then((ImageData) => {
      console.log("hola")

      this.myphoto = 'data:image/jpeg:base64,' + ImageData;
    }, (error) => {
      console.log(error)
      console.log("hola")
    })

  }
}

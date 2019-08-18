import { Component, OnInit } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'services/user.service'
import * as moment from 'moment';
import { TimeService } from 'services/time.service';
import { ListNotificacionService } from 'services/list-notificacion.service';

@Component({
  selector: 'app-modal-medicamento',
  templateUrl: './modal-medicamento.component.html',
  styleUrls: ['./modal-medicamento.component.scss'],
})
export class ModalMedicamentoComponent implements OnInit {
  datos
  form
  date = moment().format('YYYY-MM-DD')
  id
  formSend
  constructor(
    private userSrv: UserService,
    private formBuilder: FormBuilder,
    public modal: ModalController,
    public navParams: NavParams,
    private timeSrv: TimeService,
    private notificationSrv: ListNotificacionService
  ) {
    this.datos = this.navParams
    this.form = this.formBuilder.group({
      detalle: ['', Validators.required],
      nombre: ['', Validators.required],
      dosis: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      certificado: ['', Validators.required]
    })
  }
  dismiss() {
    console.log('dismiss!!!')
    this.modal.dismiss()
  }
  ngOnInit() { }

  send() {
    if (this.validator()) {
      this.formSend['id_parvulo'] = this.datos.get('id_parvulo')
      this.formSend = this.timeSrv.setTimeActual(this.formSend)
      this.notificacionNewMedicamento(this.formSend)
      this.userSrv.postMedicamento(this.formSend).subscribe(result => {
        if (result) {
          window.alert("Se agrego correctamente el medicamento")
          this.modal.dismiss()
        } else {
          window.alert("Intentelo en otro momento")
        }
      })
    } else {
      window.alert("Complete todos los campos")

    }
  }

  validator() {
    this.formSend = this.form.value
    if (this.form.valid) {
      this.formSend = this.timeSrv.setTimeActual(this.formSend)
      this.formSend = this.timeSrv.updateTimeInput(this.formSend)
      return true
    } else {
      return false
    }
  }
  notificacionNewMedicamento(datos) {
    this.userSrv.getChildren(datos.id_parvulo).subscribe(children => {
      let notificacion = {
        mensaje: `Se registro el medicamento ${datos.nombre} para ${children[0].nombre}, para el ${datos.fecha} a las ${datos.hora}`,
        titulo: "Registro nuevo medicamento",
        user: 'teacher',
        id: children[0].id,
      }
      this.notificationSrv.postNotificacion(notificacion).subscribe()
    })


  }


}

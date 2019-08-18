import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { AuthService } from 'services/auth.service'
import { ChildrenService } from 'services/children.service'
import { ModalTutorComponent } from 'views/modal/modal-tutor/modal-tutor.component'
import { ArchivoService } from 'services/archivo.service';
import { UserService } from 'services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-tutor',
  templateUrl: './user-tutor.component.html',
  styleUrls: ['./user-tutor.component.scss'],
})
export class UserTutorComponent implements OnInit {
  id
  lista = []
  dato = {}
  limit
  constructor(
    private authSrv: AuthService,
    private router: Router,
    public modal: ModalController,
    private childrenSrv: ChildrenService,
    private userSrv: UserService,
    private route: ActivatedRoute,
    public archivoSrv: ArchivoService,
    public alertController: AlertController,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.update()
  }

  update() {
    this.childrenSrv.getTutors(this.id)
      .subscribe(list => {
        this.lista = list
        this.limit = this.lista.length
      })
  }


  async presentModal(dato) {
    dato['id_parvulo'] = this.id
    const modal = await this.modal.create({
      component: ModalTutorComponent,
      componentProps: dato
    })
    modal.onDidDismiss().then(result => {
      this.update()
    })
    await modal.present()
  }


  async presentAlertConfirm(dato) {
    const alert = await this.alertController.create({
      header: 'CONFIRMAR!',
      message: 'Estas seguro de eliminar al tutor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.delete(dato)
          }
        }
      ]
    });
    await alert.present();
  }



  delete(datos) {
    this.userSrv.deleteTutor(datos)
      .subscribe(result => {
        this.update()
        if ((result)) alert('Se elimino al tutor seleccionado')
        else alert('Intentelo en otro momento')
      })
  }



}

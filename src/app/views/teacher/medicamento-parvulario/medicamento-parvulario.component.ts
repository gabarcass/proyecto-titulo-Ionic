import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { UserService } from 'services/user.service';
import { ChildrenService } from 'services/children.service';
import { TeacherService } from 'services/teacher.service';
import { TimeService } from 'services/time.service';
import { AlertController } from '@ionic/angular';
import { ListNotificacionService } from 'services/list-notificacion.service';

@Component({
  selector: 'app-medicamento-parvulario',
  templateUrl: './medicamento-parvulario.component.html',
  styleUrls: ['./medicamento-parvulario.component.scss']
})
export class MedicamentoParvularioComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id')
  lista = []
  dato = { id_parvulo: '' }
  constructor(
    private router: Router,
    public modal: ModalController,
    private childrenSrv: ChildrenService,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private timeSrv: TimeService,
    public alertController: AlertController,
    private notificationSrv: ListNotificacionService
  ) { }

  ngOnInit() {
    this.update()
  }
  update() {
    this.childrenSrv.getMedicine(this.id).subscribe(medicina => {
      this.lista = medicina
    })
  }

  async presentAlertConfirm(dato) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Estas seguro de suministrar el medicamento?',
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
            this.suministrarMedicamento(dato)
            this.notificacionSuministro(dato)
          }
        }
      ]
    });
    await alert.present();
  }


  suministrarMedicamento(datos) {
    console.log("datos", datos)
    datos = this.timeSrv.setTimeActuaEnvio(datos)
    this.teacherSrv.suministrar(datos).subscribe(medicina => {
      this.update()
    })
  }

  notificacionSuministro(datos) {
    this.teacherSrv.getChildren(this.id).subscribe(children => {
      let notificacion = {
        mensaje: `Se suministro el medicamento ${datos.nombre} a ${children[0].nombre}, a las ${datos.hora_envio}`,
        titulo: "Suministración de medicamento",
        user: 'user',
        id: children[0].id,
      }
      console.log("que pasaaaaaa")
      this.notificationSrv.postNotificacion(notificacion).subscribe()
    })


  }
}

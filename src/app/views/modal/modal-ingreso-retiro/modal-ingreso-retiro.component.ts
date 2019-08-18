import { Component, OnInit } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'
import { FormBuilder, Validators } from '@angular/forms'
import { ChildrenService } from 'services/children.service'
import { TimeService } from 'services/time.service';
import { TeacherService } from 'services/teacher.service';
import { ListNotificacionService } from 'services/list-notificacion.service';

@Component({
  selector: 'app-modal-ingreso-retiro',
  templateUrl: './modal-ingreso-retiro.component.html',
  styleUrls: ['./modal-ingreso-retiro.component.scss'],
  providers: [ChildrenService]
})
export class ModalIngresoRetiroComponent implements OnInit {
  datos
  form
  formSend
  largo
  verbo
  constructor(
    private childrenSrv: ChildrenService,
    private formBuilder: FormBuilder,
    public modal: ModalController,
    public navParams: NavParams,
    private timeSrv: TimeService,
    private teacherSrv: TeacherService,
    private notificationSrv: ListNotificacionService
  ) {
    this.datos = this.navParams
    this.largo = this.datos.get('largo')
    this.form = this.formBuilder.group({
      detalle: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.largo == 0) this.verbo = 'Ingresar'
    else this.verbo = 'Retirar'
  }
  dismiss() {
    console.log('dismiss!!!')
    this.modal.dismiss()
  }

  enviar() {
    this.formSend = this.form.value
    this.formSend['id_encargado'] = this.datos.get('id')
    if (!this.datos.get('situacion_c')) {
      this.formSend['columna'] = 'id_tutor'
    } else {
      this.formSend['columna'] = 'id_apoderado'
    }
    this.formSend = this.timeSrv.setTimeActual(this.formSend)
    this.datos.data['hora_registro'] = this.formSend.hora_registro
    if (this.largo == 0) {
      this.childrenSrv
        .checkIn(this.datos.get('id_parvulo'), this.formSend)
        .subscribe(result => {
          if (result) {
            this.notificacionIngresoRetiro(this.datos.data)
            console.log('checkIn!!!', this.formSend)
            window.alert('Se registro correctamente')
            this.dismiss()
          }
        })
    }
    else if (this.largo == 1) {
      this.childrenSrv
        .checkOut(this.datos.get('id_parvulo'), this.formSend)
        .subscribe(result => {
          if (result) {
            this.notificacionIngresoRetiro(this.datos.data)
            console.log('checkOut!!!', result)
            window.alert('Se registro correctamente')
            this.dismiss()
          }
        })
    }

  }

  notificacionIngresoRetiro(datos) {
    this.teacherSrv.getChildren(this.datos.get('id_parvulo')).subscribe(children => {
      let notificacionIngreso = {
        mensaje: `Ingreso ${children[0].nombre} a las ${datos.hora_registro} acompañado por ${datos.nombre} `,
        titulo: `Ingreso de ${children[0].nombre}`,
        user: 'user',
        id: datos.id_parvulo,
      }
      let notificacionRetiro = {
        mensaje: `Se retiro ${children[0].nombre} a las ${datos.hora_registro} por ${datos.nombre} `,
        titulo: `Retiro de ${children[0].nombre}`,
        user: 'user',
        id: datos.id_parvulo,
      }
      console.log("soy el largo", datos.largo)
      if (datos.largo == 0) {
        console.log("que wea pasa aca choro mota")
        this.notificationSrv.postNotificacion(notificacionIngreso).subscribe()
      } else if (datos.largo == 1) {
        console.log("que wea pasa aca choro naco")
        this.notificationSrv.postNotificacion(notificacionRetiro).subscribe()
      }

    })
  }
}

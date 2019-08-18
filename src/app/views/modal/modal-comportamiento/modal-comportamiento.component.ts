import { Component, OnInit } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'
import { FormBuilder, Validators } from '@angular/forms'
import { TeacherService } from 'services/teacher.service'
import * as moment from 'moment';
import { TimeService } from 'services/time.service';
import { ListNotificacionService } from 'services/list-notificacion.service';

@Component({
  selector: 'app-modal-comportamiento',
  templateUrl: './modal-comportamiento.component.html',
  styleUrls: ['./modal-comportamiento.component.scss']
})
export class ModalComportamientoComponent implements OnInit {
  datos
  form
  date = moment().format('YYYY-MM-DD')
  id
  formSend
  constructor(
    private teacherSrv: TeacherService,
    private formBuilder: FormBuilder,
    public modal: ModalController,
    public navParams: NavParams,
    private timeSrv: TimeService,
    private notificationSrv: ListNotificacionService
  ) {
    this.datos = this.navParams
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      incidencia: ['', Validators.required],
      fecha: [''],
      hora: ['']
    })
  }

  ngOnInit() {
    console.log(this.datos.data)
  }
  dismiss() {
    console.log('dismiss!!!')
    this.modal.dismiss()
  }
  send() {
    if (this.validator()) {
      this.notificacionComportamiento(this.formSend)
      this.teacherSrv.postComportamiento(this.formSend).subscribe(result => {
        if (result) {
          window.alert("Se agrego correctamente el comportamiento")
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
    this.formSend['id_parvulo'] = this.datos.get('id_parvulo')
    this.formSend = this.timeSrv.setTimeActual(this.formSend)
    if (!this.form.valid) {
      return false;
    } else if (this.form.get("incidencia").value != "reunion") {
      return true
    } else if (this.form.get('fecha').value && this.form.get('hora').value) {
      this.formSend = this.timeSrv.updateTimeInput(this.formSend)
      return true
    } else {
      return false
    }
  }

  notificacionComportamiento(datos) {
    this.teacherSrv.getChildren(datos.id_parvulo).subscribe(children => {
      let notificacion = {
        mensaje: `Se registro un nuevo comportamiento de ${children[0].nombre} a las ${datos.hora_registro}`,
        titulo: "Nuevo comportamiento",
        user: 'user',
        id: children[0].id,
      }
      this.notificationSrv.postNotificacion(notificacion).subscribe()
    })

  }
}
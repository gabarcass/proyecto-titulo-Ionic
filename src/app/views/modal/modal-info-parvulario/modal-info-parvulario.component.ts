import { Component, OnInit } from '@angular/core'
import { ModalController, NavParams } from '@ionic/angular'
import { ArchivoService } from 'services/archivo.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-modal-info-parvulario',
  templateUrl: './modal-info-parvulario.component.html',
  styleUrls: ['./modal-info-parvulario.component.scss'],
})
export class ModalInfoParvularioComponent implements OnInit {
  datos
  constructor(public modal: ModalController,
    public navParams: NavParams, ) {
    this.datos = this.navParams

  }

  ngOnInit() {
    console.log(this.datos)

  }
  dismiss() {
    console.log('dismiss!!!')
    this.modal.dismiss()
  }
}

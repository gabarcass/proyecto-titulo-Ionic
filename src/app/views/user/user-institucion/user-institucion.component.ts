import { Component, OnInit } from '@angular/core';
import { UserService } from 'services/user.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'services/auth.service';
import { ModalInfoParvularioComponent } from 'views/modal/modal-info-parvulario/modal-info-parvulario.component'
@Component({
  selector: 'app-user-institucion',
  templateUrl: './user-institucion.component.html',
  styleUrls: ['./user-institucion.component.scss'],
})
export class UserInstitucionComponent implements OnInit {
  institucion = []
  parvularios = []
  constructor(
    private authSrv: AuthService,
    public modal: ModalController,
    private userSrv: UserService,
  ) { }
  ngOnInit() {
    this.userSrv.getInstitucion({}).subscribe(institucion => {
      this.institucion = institucion[0]
    })
    this.userSrv.getParvularios({}).subscribe(parvularios => {
      this.parvularios = parvularios
    })
  }
  async presentModal(dato) {
    const modal = await this.modal.create({
      component: ModalInfoParvularioComponent,
      componentProps: dato
    });
    await modal.present()
  }

}


import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { ModalIngresoRetiroComponent } from 'views/modal/modal-ingreso-retiro/modal-ingreso-retiro.component'
import { AuthService } from 'services/auth.service'
import { ChildrenService } from 'services/children.service'

@Component({
  selector: 'app-children-control',
  templateUrl: './children-control.component.html',
  styleUrls: ['./children-control.component.scss']
})
export class ChildrenControlComponent implements OnInit {
  lista: any = []
  registroAsistencia
  id
  largo
  constructor(
    private authSrv: AuthService,
    private router: Router,
    public modal: ModalController,
    private childrenSrv: ChildrenService,
    /*  private backendSrv: BackendService, */
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    this.update()
  }
  update() {
    this.registroAsistencia = this.childrenSrv.getAsistance(this.id)
    this.largo = this.registroAsistencia.length
    this.childrenSrv
      .getAuthorizedPeople(this.route.snapshot.paramMap.get('id'))
      .then((list: any) => {
        this.lista = list
        console.log('getAuthorizedPeople', list)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  async presentModal(dato) {
    dato['id_parvulo'] = this.id
    dato['largo'] = this.registroAsistencia.length
    const modal = await this.modal.create({
      component: ModalIngresoRetiroComponent,
      componentProps: dato
    });
    modal.onDidDismiss().then(result => {
      this.update()
    })
    await modal.present()
  }
}
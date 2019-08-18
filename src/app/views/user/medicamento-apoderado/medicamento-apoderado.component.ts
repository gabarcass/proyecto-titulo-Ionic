import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { ModalMedicamentoComponent } from 'views/modal/modal-medicamento/modal-medicamento.component'
import { AuthService } from 'services/auth.service'
import { ChildrenService } from 'services/children.service';

@Component({
  selector: 'app-medicamento-apoderado',
  templateUrl: './medicamento-apoderado.component.html',
  styleUrls: ['./medicamento-apoderado.component.scss']
})
export class MedicamentoApoderadoComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id')
  lista = []
  dato = { id_parvulo: '' }
  constructor(
    private authSrv: AuthService,
    private router: Router,
    public modal: ModalController,
    private childrenSrv: ChildrenService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.update()
  }
  update() {
    this.childrenSrv.getMedicine(this.id).subscribe(medicina => {
      this.lista = medicina
    })
  }
  async presentModal() {
    this.dato['id_parvulo'] = this.id
    const modal = await this.modal.create({
      component: ModalMedicamentoComponent,
      componentProps: this.dato
    });
    modal.onDidDismiss().then(result => {
      this.update()
    })
    await modal.present()
  }
}

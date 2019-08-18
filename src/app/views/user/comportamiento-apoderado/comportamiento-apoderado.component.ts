import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { ModalController } from '@ionic/angular'
import { ModalComportamientoComponent } from 'views/modal/modal-comportamiento/modal-comportamiento.component'
import { AuthService } from 'services/auth.service'
import { ChildrenService } from 'services/children.service';

@Component({
  selector: 'app-comportamiento-apoderado',
  templateUrl: './comportamiento-apoderado.component.html',
  styleUrls: ['./comportamiento-apoderado.component.scss'],
})
export class ComportamientoApoderadoComponent implements OnInit {
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
    this.childrenSrv.getComportamiento(this.id).subscribe(comportamiento => {
      this.lista = comportamiento
      console.log("me actualize")
    })
  }
}

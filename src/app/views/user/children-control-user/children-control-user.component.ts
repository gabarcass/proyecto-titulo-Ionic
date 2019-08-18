import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { AuthService } from 'services/auth.service'
import { ChildrenService } from 'services/children.service'

@Component({
  selector: 'app-children-control-user',
  templateUrl: './children-control-user.component.html',
  styleUrls: ['./children-control-user.component.scss'],
})
export class ChildrenControlUserComponent implements OnInit {
  registroAsistencia
  id
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private childrenSrv: ChildrenService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    this.update()
  }
  update() {
    this.registroAsistencia = this.childrenSrv.getAsistance(this.id)
    console.log("registro", this.registroAsistencia)
  }
}

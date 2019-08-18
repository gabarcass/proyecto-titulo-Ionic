import { Component, OnInit } from '@angular/core'
import { BackendService } from 'services/backend.service'
import { Storage } from '@ionic/storage'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { UserService } from 'services/user.service'
@Component({
  selector: 'app-user-children',
  templateUrl: './user-children.component.html',
  styleUrls: ['./user-children.component.scss'],
  providers: [UserService]
})
export class UserChildrenComponent implements OnInit {
  seleccionado: any = {
    rut: '',
    nombre: '',
    direccion: '',

  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private storage: Storage
  ) { }

  ngOnInit() {
    console.log("prueba", this.route.snapshot.paramMap.get('id'))
    this.userSrv
      .getChildren(this.route.snapshot.paramMap.get('id'))
      .subscribe(children => {
        console.log("holi", children)
        this.seleccionado = children[0]
      })
  }
}

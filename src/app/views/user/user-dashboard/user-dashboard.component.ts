import { Component, OnInit } from '@angular/core'
import { BackendService } from 'services/backend.service'
import { Router, NavigationExtras } from '@angular/router'
import { UserService } from 'services/user.service'
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  lista = []

  constructor(private userSrv: UserService, private router: Router) { }

  ngOnInit() {
    this.userSrv.getChildrens({}).subscribe(childrens => {
      this.lista = childrens
    })
  }
}

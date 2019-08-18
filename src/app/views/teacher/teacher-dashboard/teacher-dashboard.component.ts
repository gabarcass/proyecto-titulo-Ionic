import { Component, OnInit } from '@angular/core'
import { BackendService } from 'services/backend.service'
import { Router, NavigationExtras } from '@angular/router'
import { TeacherService } from 'services/teacher.service'
@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  lista = []
  constructor(private teacherSrv: TeacherService, private router: Router) { }

  ngOnInit() {
    this.teacherSrv.getAllChildrens().subscribe(childrens => {
      this.lista = childrens
    })
  }
}

import { Component, OnInit } from '@angular/core'
import { BackendService } from 'services/backend.service'
import { Storage } from '@ionic/storage'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { TeacherService } from 'services/teacher.service'
@Component({
  selector: 'app-teacher-children',
  templateUrl: './teacher-children.component.html',
  styleUrls: ['./teacher-children.component.scss'],
  providers: [TeacherService]
})
export class TeacherChildrenComponent implements OnInit {
  seleccionado: any = {
    rut: '',
    nombre: '',
    direccion: '',

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherSrv: TeacherService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.teacherSrv
      .getChildren(this.route.snapshot.paramMap.get('id'))
      .subscribe(children => {
        this.seleccionado = children[0]
      })
  }
  muestrame() {
    this.router.navigate([this.router.url + '/medicamento'])
  }
}

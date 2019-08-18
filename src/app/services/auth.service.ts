import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BackendService } from './backend.service'

const token = 'auth-token'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticaState = new BehaviorSubject(false);

  constructor(private storageSrv: StorageService, private backend: BackendService, private router: Router) {
  }

  getSession() {
    return this.storageSrv.get('@session')
  }
  login(data: any) {
    if (data.role == 'Parvulario') {
      let teacher = this.backend.post('auth/teacher', data)
      teacher.subscribe(result => {
        if (result['success']) {
          this.setSession(result)
          this.router.navigate((['/teacher']))
        }
        else {
          window.alert("Correo o contraseña equivocada")
        }
      })
    } else {
      let user = this.backend.post('auth/user', data)
      user.subscribe(result => {
        console.log(result['token'])
        if (result['success']) {
          console.log("result", result)
          this.setSession(result)
          this.router.navigate((['/user']))
        }
        else {
          window.alert("Correo o contraseña equivocada")
        }
      })
    }
  }




  setSession(value: any) {
    this.storageSrv.set('@session', value)
  }

  removeSession() {
    this.storageSrv.remove('@session')
  }
  logout() {
    this.removeSession()
    this.router.navigate(['/login'])

  }
}

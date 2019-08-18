import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { AuthService } from 'services/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthTeacherGuard implements CanActivate {
  constructor(private router: Router, private authSrv: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authSrv.getSession()
    console.log("usuario", currentUser)

    if (currentUser && currentUser.rol === 'teacher') {
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
}
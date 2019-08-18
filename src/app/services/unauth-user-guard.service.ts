import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { AuthService } from 'services/auth.service'

@Injectable({ providedIn: 'root' })
export class UnauthUserGuard implements CanActivate {
  constructor(private router: Router, private authSrv: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authSrv.getSession()
    if (currentUser && currentUser.rol) {
      switch (currentUser.rol) {
        case 'user':
          this.router.navigate(['/user'])
          break
        case 'teacher':
          this.router.navigate(['/teacher'])
          break
      }
      return false
    } else {
      return true
    }
  }
}

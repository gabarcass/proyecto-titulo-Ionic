import { Injectable } from '@angular/core'
import { BackendService } from './backend.service'
import { AuthService } from './auth.service'
import { Subject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ListNotificacionService {
  public notRead$ = new Subject<number>()

  constructor(
    private backendSrv: BackendService,
    private authSrv: AuthService
  ) {
    this.notRead$.next(0)
  }

  getNotificacion() {
    return this.backendSrv.get('usuario/notificacion')
  }

  postNotificacion(notification) {
    notification['rol'] = this.authSrv.getSession().rol
    return this.backendSrv.post(`children/${notification.id}/notification`, notification)
  }

  putNotificacion(notification) {
    notification['rol'] = this.authSrv.getSession().rol
    return this.backendSrv.put('children/notificacion', notification)
  }

  getNotification(dato) {
    return new Observable(observer => {
      dato['rol'] = this.authSrv.getSession().rol
      this.backendSrv.post('children/notificacion', dato).subscribe(result => {
        const notRead = result.filter(notification => {
          return notification.leido.data && !notification.leido.data[0]
        })
        this.notRead$.next(notRead.length)
        console.log('notRead length', notRead.length)
        observer.next(result)
        observer.complete()
      })
    })
  }
}

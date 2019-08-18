import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Location } from '@angular/common'
import { ListNotificacionService } from 'services/list-notificacion.service'

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  notRead: number = 0

  constructor(
    private location: Location,
    public authSrv: AuthService,
    private notificationSrv: ListNotificacionService
  ) { }

  ngOnInit() {
 /*    setInterval(() => {
      this.notificationSrv.getNotification({}).subscribe(getNotification => {
        console.log('getNotification:', getNotification)
      })
    }, 1000)

    this.notificationSrv.notRead$.subscribe((value: number) => {
      console.log('value!!!!!!:', value)
      this.notRead = value
    }) */
  }

  back() {
    this.location.back()
  }
}

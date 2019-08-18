import { Component, OnInit } from '@angular/core';
import { ChildrenService } from 'services/children.service';
import { ListNotificacionService } from 'services/list-notificacion.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  lista
  constructor(public notificationSrv: ListNotificacionService) {
  }

  ngOnInit() {
    this.notificationSrv.getNotification({}).subscribe(notificaciones => {
      console.log(notificaciones)
      this.lista = notificaciones
    })

    this.notificationSrv.putNotificacion({}).subscribe(notificaciones => {
      console.log('las vi')
    })
  }


}

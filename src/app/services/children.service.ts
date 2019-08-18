import { Injectable } from '@angular/core'
import { BackendService } from 'services/backend.service'
import * as moment from 'moment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {
  constructor(private backendSrv: BackendService, private authSrv: AuthService) { }

  getAsistance(id) {
    let reg = []
    let fecha = moment().format('YYYY-MM-DD')
    this.backendSrv.get(`children/${id}/ingreso-retiro`).subscribe(result => {
      for (let idi in result) {
        if (result[idi].fecha_registro == fecha) {
          reg.push(result[idi])
        }
      }
    })
    return reg
  }

  getAuthorizedPeople(id) {
    return new Promise((resolve, reject) => {
      this.getParents(id).subscribe(
        parents => {
          let list = []
          list = parents.map(parent => {
            let p = parent
            p.role = 'parents'
            return p
          })
          this.getTutors(id).subscribe(
            tutors => {
              list = list.concat(
                tutors.map(tutor => {
                  let t = tutor
                  t.role = 'tutor'
                  return t
                })
              )
              console.log('list', list)
              resolve(list)
            },
            error => {
              reject(error)
            }
          )
        },
        error => {
          reject(error)
        }
      )
    })
  }

  public getTutors(id) {
    return this.backendSrv.get(`children/${id}/tutor`)
  }

  private getParents(id) {
    return this.backendSrv.get(`usuario/${id}`)
  }

  getMedicine(id) {
    return this.backendSrv.get(`children/${id}/medicamentos`)
  }

  checkIn(id, data) {
    data.tipo = 0
    return this.backendSrv.post(`children/${id}/ingreso-retiro`, data)
  }

  checkOut(id, data) {
    data.tipo = 1
    return this.backendSrv.post(`children/${id}/ingreso-retiro`, data)
  }

  getComportamiento(id) {
    return this.backendSrv.get(`children/${id}/comportamiento`)
  }

  getNotification(dato) {
    dato['rol'] = this.authSrv.getSession().rol
    return this.backendSrv.post('children/notificacion', dato)
  }

}

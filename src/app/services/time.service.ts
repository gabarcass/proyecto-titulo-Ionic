import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  setTimeActual(dato) {
    dato['hora_registro'] = moment().format('HH:mm')
    dato['fecha_registro'] = moment().format('YYYY-MM-DD')
    return dato
  }
  setTimeActuaEnvio(dato) {
    dato['hora_envio'] = moment().format('HH:mm')
    dato['fecha_envio'] = moment().format('YYYY-MM-DD')
    return dato

  }
  updateTimeInput(dato) {
    dato['fecha'] = dato.fecha.split('T')[0]
    dato['hora'] = dato.hora.split('T')[1].split('.')[0].substring(0, 5)
    return dato
  }


}

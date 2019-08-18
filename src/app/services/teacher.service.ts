import { Injectable } from '@angular/core'
import { BackendService } from 'services/backend.service'
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  seleccionado
  constructor(private backendSrv: BackendService) { }

  getChildren(id) {
    this.seleccionado = this.backendSrv.post(`children/${id}`, { id })
    return this.seleccionado
  }

  postComportamiento(datos) {
    return this.backendSrv.post(`children/${datos.id_parvulo}/comportamiento`, datos)
  }


  getAllChildrens() {
    return this.backendSrv.get(`children`)
  }

  suministrar(datos) {
    return this.backendSrv.put(`children/${datos.id_parvulo}/medicamentos/${datos.id}`, datos)
  }

}

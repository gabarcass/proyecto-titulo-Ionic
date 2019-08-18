import { Injectable } from '@angular/core';
import { BackendService } from 'services/backend.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backendSrv: BackendService) { }

  getChildrens(id) {
    return this.backendSrv.post(`usuario/children`, id)
  }

  getChildren(id) {
    return this.backendSrv.post(`children/${id}`, { id })
  }

  postMedicamento(datos) {
    return this.backendSrv.post(`children/${datos.id_parvulo}/medicamentos`, datos)
  }
  postTutor(datos) {
    console.log("soy los datos", datos)
    return this.backendSrv.post(`children/${datos.id_parvulo}/tutor`, datos)
  }
  editTutor(datos) {
    return this.backendSrv.put(`children/${datos.id_parvulo}/tutor/${datos.id}}`, datos)
  }
  deleteTutor(datos) {
    return this.backendSrv.del(`children/${datos.id_parvulo}/tutor/${datos.id}`)
  }

  getInstitucion(datos) {
    return this.backendSrv.post(`usuario/institucion`, datos)
  }
  getParvularios(datos) {
    return this.backendSrv.post('usuario/parvularios', datos)
  }

}

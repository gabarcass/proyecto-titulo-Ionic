import { Component, OnInit } from '@angular/core'
import { BackendService } from '../../../services/backend.service'
import { ActivatedRoute } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx'

@Component({
  selector: 'app-contactar-padres',
  templateUrl: './contactar-padres.component.html',
  styleUrls: ['./contactar-padres.component.scss']
})
export class ContactarPadresComponent implements OnInit {
  lista
  id
  constructor(
    private call: CallNumber,
    private backendSrv: BackendService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.obtenerApoderadosParvulo().subscribe()
  }

  obtenerApoderadosParvulo() {
    let obs = this.backendSrv.get('usuario/' + this.id)
    obs.subscribe(result => {
      console.log(result)
      this.lista = result
    })
    return obs
  }
  llamar(numero) {
    console.log('numero', numero)
    this.call
      .callNumber(numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err))
  }

  chat() {
    console.log('soy el chat')
  }
}

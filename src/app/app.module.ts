import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CallNumber } from '@ionic-native/call-number/ngx'
import { IonicStorageModule } from '@ionic/storage'
import { environment } from '../environments/environment'
import { Firebase } from '@ionic-native/firebase'
import { AngularFireModule } from "@angular/fire"

//VIEWS
/* import { MenuParvularioComponent } from './views/teacher/menu-parvulario/menu-parvulario.component' */
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { MedicamentoParvularioComponent } from './views/teacher/medicamento-parvulario/medicamento-parvulario.component'
/* import { IngresoRetiroParvularioComponent } from './views/teacher/ingreso-parvulario/ingreso-parvulario.component' */
import { ComportamientoParvularioComponent } from './views/teacher/comportamiento-parvulario/comportamiento-parvulario.component'
import { LoginComponent } from './views/login/login.component'
import { ContactarPadresComponent } from './views/teacher/contactar-padres/contactar-padres.component'
import { ListNotificacionService } from 'services/list-notificacion.service'
// Teacher
import { TeacherComponent } from './views/teacher/teacher.component'
import { TeacherDashboardComponent } from 'views/teacher/teacher-dashboard/teacher-dashboard.component'
import { TeacherChildrenComponent } from './views/teacher/teacher-children/teacher-children.component'
import { ChildrenControlComponent } from './views/teacher/children-control/children-control.component'
//Modales
import { ModalIngresoRetiroComponent } from './views/modal/modal-ingreso-retiro/modal-ingreso-retiro.component'
import { ModalComportamientoComponent } from './views/modal/modal-comportamiento/modal-comportamiento.component'
import { ModalMedicamentoComponent } from 'views/modal/modal-medicamento/modal-medicamento.component'
import { ModalInfoParvularioComponent } from 'views/modal/modal-info-parvulario/modal-info-parvulario.component'
import { ModalTutorComponent } from 'views/modal/modal-tutor/modal-tutor.component'

//Componente
import { TopBarComponent } from './component/top-bar/top-bar.component'
import { UserComponent } from 'views/user/user.component'

//User
import { UserChildrenComponent } from 'views/user/user-children/user-children.component'
import { UserDashboardComponent } from 'views/user/user-dashboard/user-dashboard.component'
import { ChildrenControlUserComponent } from 'views/user/children-control-user/children-control-user.component'
import { MedicamentoApoderadoComponent } from 'views/user/medicamento-apoderado/medicamento-apoderado.component'
import { ComportamientoApoderadoComponent } from 'views/user/comportamiento-apoderado/comportamiento-apoderado.component'
import { UserTutorComponent } from 'views/user/user-tutor/user-tutor.component'
import { Camera } from '@ionic-native/camera/ngx'
import { HomeapoderadoComponent } from 'views/user/homeapoderado/homeapoderado.component'
import { IngresoRetiroApoderadoComponent } from 'views/user/ingreso-retiro-apoderado/ingreso-retiro-apoderado.component'
import { UserInstitucionComponent } from 'views/user/user-institucion/user-institucion.component'
import { ChatComponent } from 'views/share/chat/chat.component'
import { ChatDetailsComponent } from 'views/share/chat-details/chat-details.component'
import { NotificationsComponent } from 'views/share/notifications/notifications.component'
import { firebaseConfig } from '../environments/environment'

export class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve('BASE_64_ENCODED_DATA_GOES_HERE')
    })
  }
}



@NgModule({
  declarations: [
    ModalMedicamentoComponent,
    ModalComportamientoComponent,
    TopBarComponent,
    ContactarPadresComponent,
    ModalIngresoRetiroComponent,
    LoginComponent,
    ComportamientoParvularioComponent,
    UserInstitucionComponent,
    AppComponent,
    MedicamentoParvularioComponent,
    TeacherComponent,
    TeacherDashboardComponent,
    TeacherChildrenComponent,
    ChildrenControlComponent,
    UserComponent,
    UserChildrenComponent,
    UserDashboardComponent,
    ChildrenControlUserComponent,
    MedicamentoApoderadoComponent,
    ComportamientoApoderadoComponent,
    UserTutorComponent,
    ModalTutorComponent,
    ModalInfoParvularioComponent,
    HomeapoderadoComponent,
    IngresoRetiroApoderadoComponent,
    ChatComponent,
    ChatDetailsComponent,
    NotificationsComponent
  ],
  entryComponents: [
    ModalInfoParvularioComponent,
    ModalMedicamentoComponent,
    ModalTutorComponent,
    ModalIngresoRetiroComponent,
    ModalComportamientoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],

  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Camera, useClass: CameraMock },
    ListNotificacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
/* import { MenuParvularioComponent } from './views/teacher/menu-parvulario/menu-parvulario.component' */
import { MedicamentoParvularioComponent } from './views/teacher/medicamento-parvulario/medicamento-parvulario.component'
/* import { IngresoRetiroParvularioComponent } from './views/teacher/ingreso-parvulario/ingreso-parvulario.component' */
import { ComportamientoParvularioComponent } from './views/teacher/comportamiento-parvulario/comportamiento-parvulario.component'
import { LoginComponent } from './views/login/login.component'

// Teacher
import { TeacherComponent } from './views/teacher/teacher.component'
import { TeacherDashboardComponent } from './views/teacher/teacher-dashboard/teacher-dashboard.component'
import { TeacherChildrenComponent } from './views/teacher/teacher-children/teacher-children.component'
import { ContactarPadresComponent } from './views/teacher/contactar-padres/contactar-padres.component'
import { ChildrenControlComponent } from './views/teacher/children-control/children-control.component'
import { AuthTeacherGuard } from './services/auth-teacher-guard.service'
import { UnauthUserGuard } from './services/unauth-user-guard.service'

//User
import { UserComponent } from './views/user/user.component'
import { UserDashboardComponent } from './views/user/user-dashboard/user-dashboard.component'
import { UserChildrenComponent } from './views/user/user-children/user-children.component'
import { ChildrenControlUserComponent } from './views/user/children-control-user/children-control-user.component'
import { ComportamientoApoderadoComponent } from './views/user/comportamiento-apoderado/comportamiento-apoderado.component'
import { MedicamentoApoderadoComponent } from './views/user/medicamento-apoderado/medicamento-apoderado.component'
import { UserTutorComponent } from 'views/user/user-tutor/user-tutor.component'
import { UserInstitucionComponent } from 'views/user/user-institucion/user-institucion.component'
import { AuthUserGuard } from './services/auth-user-guard.service'
import { NotificationsComponent } from 'views/share/notifications/notifications.component'
import { ChatComponent } from 'views/share/chat/chat.component'
import { ChatDetailsComponent } from 'views/share/chat-details/chat-details.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthUserGuard]
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: TeacherDashboardComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },

      {
        path: 'children/:id',
        component: TeacherChildrenComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: 'children/:id/contact',
        component: ContactarPadresComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: 'children/:id/conduct',
        component: ComportamientoParvularioComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: 'children/:id/control',
        component: ChildrenControlComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: 'children/:id/medicine',
        component: MedicamentoParvularioComponent,
        canActivate: [AuthTeacherGuard]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserDashboardComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'chat',
        component: ChatComponent,
        children: [
          {
            path: 'chat/:id',
            component: ChatDetailsComponent
          }
        ]
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'institucion',
        component: UserInstitucionComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'children/:id',
        component: UserChildrenComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'children/:id/tutor',
        component: UserTutorComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'children/:id/conduct',
        component: ComportamientoApoderadoComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'children/:id/control',
        component: ChildrenControlUserComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: 'children/:id/medicine',
        component: MedicamentoApoderadoComponent,
        canActivate: [AuthUserGuard]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  },
  /*  {
    path: 'menu/:id',
    component: MenuParvularioComponent
  }, */
  /* {
    path: 'menu/:id/contacto',
    component: ContactarPadresComponent
  }, */
  /* {
    path: 'menu/:id/medicamento',
    component: MedicamentoParvularioComponent
  }, */
  /* {
    path: 'menu/:id/retiro',
    component: IngresoRetiroParvularioComponent
  },
  {
    path: 'menu/:id/ingreso',
    component: IngresoRetiroParvularioComponent
  }, */
  /* {
    path: 'menu/:id/comportamiento',
    component: ComportamientoParvularioComponent
  }, */

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

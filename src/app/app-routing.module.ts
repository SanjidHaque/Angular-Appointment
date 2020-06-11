import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {ListsComponent} from './components/lists/lists.component';

const routes: Routes = [
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: '',
    redirectTo: '/appointment',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

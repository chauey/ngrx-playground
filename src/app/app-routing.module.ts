import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  {
    path: 'tickets',
    loadChildren: 'app/tickets/tickets.module#TicketsModule'
  },
  // {
  //   path: 'villains',
  //   loadChildren: 'app/villains/villains.module#VillainsModule'
  // },
  { path: '**', redirectTo: 'tickets' } // bad routes redirect to heroes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

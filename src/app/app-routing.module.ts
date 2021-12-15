import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from './cars-list/cars-list.component';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CarsListComponent,
  },
  {
    path: 'owner/create',
    component: OwnerDetailComponent,
  },
  {
    path: 'owner/:id',
    component: OwnerDetailComponent,
  },
  {
    path: 'owner/:id/edit',
    component: OwnerDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

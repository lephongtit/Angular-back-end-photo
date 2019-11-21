import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotoComponent} from "./photo/photo.component";
import {PhotoDetailComponent} from "./photo-detail/photo-detail.component";
import {PhotoEditComponent} from "./photo-edit/photo-edit.component";


const routes: Routes = [{
  path: 'photo',
  component: PhotoComponent
}, {
  path: 'photo/:id',
  component: PhotoDetailComponent
}, {
  path: 'photo/:id/edit',
  component: PhotoEditComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

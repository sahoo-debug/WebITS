import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepItemComponent } from './components/step-item/step-item.component';
const routes: Routes = [
  { path:'stepitem', component:StepItemComponent},
  { path:'', component:StepItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

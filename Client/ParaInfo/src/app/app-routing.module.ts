import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGliderComponent } from './components/create-glider/create-glider.component';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { 
    path: '', component: HomeComponent,
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'createGlider', component: CreateGliderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

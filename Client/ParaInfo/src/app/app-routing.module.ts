import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './components/brandComponents/brand/brand.component';
import { CreateComponent } from './components/create/create.component';
import { DetailsComponent } from './components/detailsComponents/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'brand/:brandName', component: BrandComponent },
  { path: 'brand/:brandName/:category', component: BrandComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:type/:brand/:model', component: DetailsComponent },
  { path: 'edit/:type/:brand', component: EditComponent },
  { path: 'edit/:type/:brand/:model', component: EditComponent },
  { path: 'create/:type', component: CreateComponent, canActivate: [AuthGuardService] },
  { path: 'create/:type/:brandName', component: CreateComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NoPageFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

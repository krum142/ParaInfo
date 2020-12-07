import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandComponent } from './components/brandComponents/brand/brand.component';
import { CreateBrandComponent } from './components/brandComponents/create-brand/create-brand.component';
import { CreateParagliderComponent } from './components/create-paraglider/create-paraglider.component';
import { DetailsComponent } from './components/detailsComponents/details/details.component';
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
  { path: 'details/:type/:brand/:model', component: DetailsComponent},
  { path: 'createbrand', component: CreateBrandComponent, canActivate: [AuthGuardService] },
  { path: 'createparaglider/:brandName', component: CreateParagliderComponent, canActivate: [AuthGuardService]},
  { path: '**', component: NoPageFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

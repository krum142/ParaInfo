import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrandService } from './services/brand.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';

import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { BrandComponent } from './components/brandComponents/brand/brand.component';
import { BrandCategoriesComponent } from './components/brandComponents/brand-categories/brand-categories.component';
import { ParagliderService } from './services/paraglider.service';
import { FormDataService } from './services/form-data.service';
import { MyValidators } from './services/MyValidators';
import { GetProductsService } from './services/get-products.service';
import { DetailsComponent } from './components/detailsComponents/details/details.component';
import { ParagliderDetailsComponent } from './components/detailsComponents/paraglider-details/paraglider-details.component';
import { LoadBrandProductsComponent } from './components/brandComponents/load-brand-products/load-brand-products.component';
import { ProductHeaderComponent } from './components/brandComponents/product-header/product-header.component';
import { CreateComponent } from './components/create/create.component';
import { ParagliderFormComponent } from './components/forms/paraglider-form/paraglider-form.component';
import { BrandFormComponent } from './components/forms/brand-form/brand-form.component';
import { EditComponent } from './components/edit/edit.component';
import { HarnessFormComponent } from './components/forms/harness-form/harness-form.component';
import { HarnessService } from './services/harness.service';
import { HarnessDetailsComponent } from './components/detailsComponents/harness-details/harness-details.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BrandComponent,
    NoPageFoundComponent,
    BrandCategoriesComponent,
    ParagliderFormComponent,
    LoadBrandProductsComponent,
    DetailsComponent,
    ParagliderDetailsComponent,
    ProductHeaderComponent,
    CreateComponent,
    BrandFormComponent,
    EditComponent,
    HarnessFormComponent,
    HarnessDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    ParagliderService,
    HarnessService,
    FormDataService,
    GetProductsService,
    BrandService,
    MyValidators,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule
  ]
})
export class HomeModule { }

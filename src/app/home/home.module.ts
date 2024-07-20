import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category.service';
import { CategoriesStoreItem } from './services/categories.storeItem';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';




@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductdetailsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [CategoryService, CategoriesStoreItem]
})
export class HomeModule { }

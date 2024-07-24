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
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductdetailsComponent,
    ProductsGalleryComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
  ],
  providers: [CategoryService, CategoriesStoreItem, ProductsStoreItem, ProductsService, CartStoreItem]
})
export class HomeModule { }

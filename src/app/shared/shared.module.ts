import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from './components/ratings/ratings.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RatingsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    RatingsComponent,
  ]
})
export class SharedModule { }

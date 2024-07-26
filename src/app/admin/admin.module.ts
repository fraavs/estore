import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';

@NgModule({
    declarations: [
        AdminComponent,
        HeaderComponent,
        CatnavigationComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        HttpClientModule,
        RouterModule,
        AdminRoutingModule,
    ],
    providers: [
    ]
})

export class AdminModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainMenueComponent } from './main-menue/main-menue.component';
import { OrderPlaceComponent } from './order-place/order-place.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { OrderService } from './services/order.service';
import { ItemService } from './services/item.service';
import { OrderItemComponent } from './order-place/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenueComponent,
    OrderPlaceComponent,
    ItemAddComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'main-menue',
        component: MainMenueComponent
      },
      {
        path: 'place-order',
        component: OrderPlaceComponent
      },
      {
        path: 'add-item',
        component: ItemAddComponent
      }

    ])    
  ],
  providers: [ItemService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

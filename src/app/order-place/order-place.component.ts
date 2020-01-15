import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderItems, OrderItemsForBackend } from '../models/OrderItems';

import { OrderService } from '../services/order.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent implements OnInit {
  orderItems: OrderItems[] = [{itemGroup:"", itemID:"",itemName:"",quantity:0}];
  orderItemsForBackend: OrderItemsForBackend[] = [{itemGroup:"", itemID:"",quantity:0}];
  

    // ===== constructor 
    constructor(private router: Router, private orderService: OrderService) { }

    // ===== ngOnInit 
    ngOnInit() {

  }

    // ===== addItem 
    addItem(orderItem: OrderItems) {
    this.orderItems.push(orderItem);

    const item = {
      itemGroup: orderItem.itemGroup,
      itemID: orderItem.itemID,
      quantity: Number(orderItem.quantity)
    }
    this.orderItemsForBackend.push(item)

    if(this.orderItems[0].itemGroup === "") {
      this.orderItems.shift()
      this.orderItemsForBackend.shift()
    }

  }

    // ===== Delete button clicked
  onDeleteItem(index: any) {
    this.orderItems.splice(index,1)
    this.orderItemsForBackend.splice(index,1)
  }


    // ===== Home button clicked
    homeButtonClicked(): void {
      this.router.navigate(['main-menue'], { skipLocationChange: true });
    }
  
    // ===== Submit button clicked
    onSubmit(event: any) {
        //console.log(this.orderItemsForBackend)

        const orderJSON = {
          header: {
            lastUpdate: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US'),
            userId: "Shashi Dalmia"
          },
          itemDetails: this.orderItemsForBackend
        }      

        // console.log(JSON.stringify(orderJSON))

        this.orderService.placeOrder(JSON.stringify(orderJSON)).subscribe(
          res => {
            console.log(res);
            const resJSON = res.json()
            window.alert("Order Number : " + resJSON.orderNumber);
            this.orderItems.length = 0;
            this.orderItemsForBackend.length=0
            },
          err => { 
            console.log("->"+err)
            });
    
  

    }



}

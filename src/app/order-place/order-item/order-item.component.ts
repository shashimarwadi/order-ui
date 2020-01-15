import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { OrderItems } from '../../models/OrderItems';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Output() addItem: EventEmitter<any> = new EventEmitter();

  itemMaster: OrderItems[];

  itemGroup: string;
  itemID: string;
  itemName: string;
  quantity: number


  itemGroups: string[]= [""];
  itemIDs: string[]= [""];
  selectedGroup = ""
  selectedItem = "";
  
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItemsWithoutImage().subscribe((returnItemMaster: any) => {
      this.itemMaster = returnItemMaster;
      for(let thisItem of this.itemMaster) {
        if(!this.itemGroups.includes(thisItem.itemGroup)) {
          //console.log(thisItem.itemGroup)
          this.itemGroups.push(thisItem.itemGroup)
        }
      }
    })  
  }

  // === Show all respective Items
  showItems(event:any) {
    this.selectedGroup = event.target.value

    //console.log("====" + this.selectedGroup)

    this.itemIDs = [""];
    for(let thisItem of this.itemMaster) {
      if(thisItem.itemGroup === this.selectedGroup) {
        //console.log(thisItem.itemID)
        this.itemIDs.push(thisItem.itemID)
      }
    }

  }

  showItemDetails(event: any) {

    this.selectedItem = event.target.value
    this.itemName = ""

    for(let thisItem of this.itemMaster) {
      if(thisItem.itemGroup === this.selectedGroup && thisItem.itemID === this.selectedItem) {
        // console.log(thisItem.itemName)
        this.itemName = thisItem.itemName
      }
    }
  }

  onSubmit() {

    const orderItem = {
      itemGroup:this.selectedGroup,
      itemID: this.selectedItem,
      itemName: this.itemName,
      quantity: this.quantity
    }

    this.addItem.emit(orderItem);
  }

  

}

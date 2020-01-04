import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { FormArray } from '@angular/forms';

import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.css']
})
export class OrderPlaceComponent implements OnInit {

  orderForm : any;
  itemMaster: ItemMaster[];
  item_iist: any;
  ImageSource: any

  placeOrderForm = this.fb.group({
    purchaseItem: this.fb.array([
      this.fb.control({
        item:[''],
        quantity:['']
      })
    ])
  });

  constructor(private router: Router, private itemService: ItemService, private fb: FormBuilder) { }

  ngOnInit() {
    this.itemService.getItemsWithoutImage().subscribe((returnItemMaster: any) => {
      this.itemMaster = returnItemMaster;  
      console.log(returnItemMaster)

    })  
  }

  homeButtonClicked(): void {
    this.router.navigate(['main-menue'], { skipLocationChange: true });
  }
  
  onSubmit() {

  }

  addItemLine() {
    this.purchaseItem.push(this.fb.control(''));
  }

  get purchaseItem() {
    return this.placeOrderForm.get('purchaseItem') as FormArray;
  }

}

/*=====================================*/
/*  ------- Interface: ItemMaster ------- */
/*=====================================*/
interface ItemMaster {
  itemNumber : number;
  itemGroup : string;
  itemID : string;
  itemDescription : string;
  itemName : string;
  itemImage : Blob;
}
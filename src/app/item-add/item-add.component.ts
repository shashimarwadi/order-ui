import { Component, OnInit, Input , OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../services/item.service';


@Component({
  selector: 'app-item-add', 
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  localUrl: any[];
  itemGroupArray: any[]
  itemGroupName: any;
  addItemForm: any;
  selectedImageFile: File = null;
  
  
  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.addItemForm = new FormGroup({
      itemCode : new FormControl(""),
      itemName : new FormControl(""),
      itemDescription : new FormControl(""),
    });

    this.itemGroupArray = ['Electronics', 'Furniture', 'Home', 'Toys'];
    this.itemGroupName = this.itemGroupArray[0];
    
    }
  

  // ===== Home button clicked
  homeButtonClicked(): void {
    this.router.navigate(['main-menue'], { skipLocationChange: true });
  }

  // ===== Function to load image
  onFileChanged(event : any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      this.selectedImageFile = event.target.files[0]

    }


  }

  onValueChange(event: any) {
    if(event.target.name == "itemGroup") {
//      console.group(event.target.value)
      this.itemGroupName = event.target.value
    }

  }

  // ===== Submit function
  onSubmit(submitForm: FormGroup) {

    // console.log(submitForm)

    let userJSON = {'itemGroup' : this.itemGroupName , 
                    'itemID' : this.addItemForm.controls['itemCode'].value , 
                    'itemName': this.addItemForm.controls['itemName'].value , 
                    'itemDescription': this.addItemForm.controls['itemDescription'].value
                  };

    this.itemService.addItem(JSON.stringify(userJSON), this.selectedImageFile).subscribe(
      res => {
        window.alert("added")
        console.log(res);
        },
      err => { 
        console.log("->"+err)
        });
  }

}

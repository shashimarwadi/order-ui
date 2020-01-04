import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menue',
  templateUrl: './main-menue.component.html',
  styleUrls: ['./main-menue.component.css']
})

@Injectable()
export class MainMenueComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  whichButtomWasClicked(value): void {
    console.log(value)

    switch (value) {
      case "item": {
        this.router.navigate(['add-item'], { skipLocationChange: true });
        break;
      }
      case "placeOrder": {
        this.router.navigate(['place-order'], { skipLocationChange: true });
        break;
      }
      case "findOrder": {
        this.router.navigate(['find-order'], { skipLocationChange: true });
        break;
      }
      default: { 
        break; 
     }
    }
}

}

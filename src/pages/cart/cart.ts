import { Component } from '@angular/core';
import {  NavController, NavParams ,ViewController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CheckoutPage} from '../checkout/checkout';
import {LoginPage} from '../login/login';

 


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems:any[]=[];
  total:any;
  showEmptyCartMessage:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public viewCtrl:ViewController,public toastController: ToastController) {
     

    this.total = 0.0;
    
    this.storage.ready().then(()=>{

      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;
      
        if(this.cartItems != null){

          this.cartItems.forEach( (item, index)=> {

            if(item.variation){
              this.total = this.total + (parseFloat(item.variation.price) * item.qty);
            } else {
              this.total = this.total + (item.product.price * item.qty)
            }

          })

        } else {

          this.showEmptyCartMessage = true;

        }


      })

    })


  }

  

  removeFromCart(item,i){

    let price=item.product.price;
    let qty=item.qty;
    this.cartItems.splice(i,1);
    this.storage.set("cart",this.cartItems).then(()=>{

      this.total=this.total-(price*qty);
    });
    if(this.cartItems.length==0){
      this.showEmptyCartMessage=true;

    }

  }
  

  closeModal(){


        this.viewCtrl.dismiss();

  }
  checkout(){


    this.storage.get("userLoginInfo").then( (data) => {
      if(data != null){
        this.navCtrl.push(CheckoutPage);
      } else {
        this.navCtrl.push(LoginPage);

      }

    });



  }

}

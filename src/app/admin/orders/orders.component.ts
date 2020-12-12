import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class AdminOrdersComponent implements OnInit {

  @Input()
  rezults: Observable<any>;

  constructor(private ordersService: OrdersService) { 
  ordersService.getOrders().subscribe((value) => console.log(value));
  }

  ngOnInit(): void {}

}

interface orders{
    id:number,
    order_time:string,
    delivery_time:string,
    address_from:string,
    address_to:string,
    status:string,
    price:number
}

export interface Order {
  id: number;
  order_time: string;
  delivery_time: string;
  address_from: string;
  address_to: string;
  status: string;
  price: number;
}

export class Order {
  _id: "string";
  products: {
    product: {
      productName: string;
      price: number;
    };
    quantity: number;
  };
  customerDetails: {
    city: string;
    street: string;
    apartment: string;
    county: string;
    phone: string;
    name: string;
  };
  createdDate: string;
  total: number;

  setProperties(dto: any) {
    this.setOrderInfo(dto);
  }

  private setOrderInfo(dto: any) {
    this.products = dto.products;
    this.customerDetails = dto.customerDetails;
    this.createdDate = dto.createdDate;
    this.total = dto.total;
    this._id = dto._id;
  }
}

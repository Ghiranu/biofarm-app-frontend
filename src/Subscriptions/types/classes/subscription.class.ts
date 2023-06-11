export class Subscription {
  _id: "string";
  products: {
    product: {
      title: string;
      price: string;
      image: any;
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
  startDate: string;
  endDate: string;
  recurrence: string;
  total: number;

  setProperties(dto: any) {
    this.setSubscriptionInfo(dto);
  }

  private setSubscriptionInfo(dto: any) {
    this.products = dto.products;
    this.customerDetails = dto.customerDetails;
    this.startDate = dto.startDate;
    this.endDate = dto.endDate;
    this.total = dto.total;
    this.recurrence = dto.recurrence;
    this._id = dto._id;
  }
}

export class Expense {
  id: number;
  name: string;
  price: number;
  description: string;
  reason: string;
  date: string;

  constructor(
    id?: number,
    name?: string,
    price?: number,
    desc?: string,
    reas?: string,
    date?: string
  ) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.description = desc;
      this.reason = reas;
      this.price = price;
  }
}

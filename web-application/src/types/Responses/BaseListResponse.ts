export class BaseListResponse {
  time: Date;
  items: any[];
  count: number;
  totalCount: number;

  constructor(time: Date,items: any[], count: number, totalCount: number) {
    this.time = time;
    this.items = items;
    this.count = count;
    this.totalCount = totalCount;
  }
}

export interface IVoucher {
  name: string;
  code: string;
  amount: number;
  voucherNumber: number;
  isActive: boolean;
  _id?: string;
  createdAt?: Date;
  updateAt?: Date;
}

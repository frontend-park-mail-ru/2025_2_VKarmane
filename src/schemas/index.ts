export interface TransactionIntefrace {
  account_id: number;
  category_id: number;
  receiver_id: number;
  sum: number;
  name: string;
  type: string;
  description: string;
  date: Date;
}

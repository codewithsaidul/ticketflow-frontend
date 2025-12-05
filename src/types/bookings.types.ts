import { ISeat } from "./seats.types";

export interface IEventSummary {
  _id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface IPaymentSummary {
  transactionId: string;
  status: "unpaid" | "paid" | "cancel" | "failed";
  amount: number;
}

export interface IBooking {
  _id: string;
  event: IEventSummary;
  user: string;
  payment: IPaymentSummary;
  seats: ISeat[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "expired" | "failed";
  transactionId?: string;
  isDeleted: boolean;
}

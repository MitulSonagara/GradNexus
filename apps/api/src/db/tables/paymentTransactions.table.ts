import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class PaymentTransactionsTable extends BaseTable {
    readonly table = "payment_transactions";
    columns = this.setColumns((t) => ({
        transactionId: t
            .uuid()
            .primaryKey().default(t.sql`gen_random_uuid()`),
        alumniId: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        amount: t.decimal(10, 2),
        paymentMethod: t.enum('payment_method', ['Credit Card', 'UPI', 'Bank Transfer']),
        paymentStatus: t.enum('payment_status', ['Pending', 'Completed', 'Failed']),
        transactionDate: t.timestamp(),
    }));
}

export type PaymentTransaction = Selectable<PaymentTransactionsTable>;
export type PaymentTransactionUpdate = Updatable<PaymentTransactionsTable>;
export type PaymentTransactionForQuery = Queryable<PaymentTransactionsTable>;

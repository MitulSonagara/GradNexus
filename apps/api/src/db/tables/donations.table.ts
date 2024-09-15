import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { ProjectsTable } from "./project.table";
import { PaymentTransactionsTable } from "./paymentTransactions.table";
import { UserTable } from "./user.table";

export class DonationsTable extends BaseTable {
    readonly table = "donations";
    columns = this.setColumns((t) => ({
        donationId: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
        projectId: t.uuid().foreignKey(() => ProjectsTable, 'projectId'),
        paymentId: t.uuid().foreignKey(() => PaymentTransactionsTable, 'transactionId'),
        donator: t.uuid().foreignKey(() => UserTable, 'id'),
        amount: t.decimal(),
        donationType: t.enum('donation_type', ['One-time', 'Recurring']),
        frequency: t.enum('frequency', ['Monthly', 'Quarterly', 'Yearly']),
        donationDate: t.timestamp(),
        createAt: t.timestamp().default(t.sql`now()`),
        updatedAt: t.timestamp().default(t.sql`now()`),
    }))
}

export type Donation = Selectable<DonationsTable>;
export type DonationUpdate = Updatable<DonationsTable>;
export type DonationForQuery = Queryable<DonationsTable>;
import { orchidORM } from "orchid-orm";
import { env, isTest } from "../configs/env.config";
import { UserTable } from "./tables/user.table";
import { ProjectsTable } from "./tables/project.table";
import { DonationsTable } from "./tables/donations.table";
import { EventsTable } from "./tables/events.table";
import { JobPostingsTable } from "./tables/jobPosting.table";
import { PaymentTransactionsTable } from "./tables/paymentTransactions.table";
import { SuccessStoriesTable } from "./tables/successStories.table";
import { JobApplicationTable } from "./tables/jobApplication.table";
import { AttendeesTable } from "./tables/attendees.table";
import { NetworkingHub } from "./tables/networkingHub.table";

export const db = orchidORM(
  {
    // biome-ignore lint/style/useNamingConvention: <as needed by library>
    databaseURL: isTest ? (env.DB_TEST_URL as string) : (env.DB_URL as string),
    max: 100,
    min: 10,
  },
  {
    user: UserTable,
    projects: ProjectsTable,
    donations: DonationsTable,
    events: EventsTable,
    job_postings: JobPostingsTable,
    payment_transaction: PaymentTransactionsTable,
    success_stories: SuccessStoriesTable,
    job_application: JobApplicationTable,
    attendees: AttendeesTable,
    networking_hub: NetworkingHub,
  }
);

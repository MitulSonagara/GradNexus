import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { JobPostingsTable } from "./jobPosting.table";
import { UserTable } from "./user.table";

export class JobApplicationTable extends BaseTable {
  readonly table = "job_application";
  columns = this.setColumns((t) => ({
    applicationId: t
        .uuid()
        .primaryKey().default(t.sql`gen_random_uuid()`),
    jobId: t
        .uuid()
        .foreignKey(() => JobPostingsTable, 'jobId'),
    alumniId: t
        .uuid()
        .foreignKey(() => UserTable, 'id'),
    applicationDate: t
        .timestamp(),
    resumeUrl: t
        .string().trim(),
    coverLetter: t
        .text(),
    status: t
        .enum('status', ['Submitted', 'Interview', 'Hired', 'Rejected']),
  }));
}

export type JobApplication = Selectable<JobApplicationTable>;
export type JobApplicationUpdate = Updatable<JobApplicationTable>;
export type JobApplicationForQuery = Queryable<JobApplicationTable>;

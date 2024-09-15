import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class JobPostingsTable extends BaseTable {
  readonly table = "job_postings";
  columns = this.setColumns((t) => ({
    jobId: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    postedBy: t
      .uuid()
      .foreignKey(() => UserTable, 'id'), 
    jobTitle: t.string().trim(),
    companyName: t.string().trim(),
    location: t.string().trim(),
    description: t.text(),
    salaryRange: t.string().trim(),
    jobType: t.string().trim(),
    createdAt: t.timestamp(),
  }));
}

export type JobPosting = Selectable<JobPostingsTable>;
export type JobPostingUpdate = Updatable<JobPostingsTable>;
export type JobPostingForQuery = Queryable<JobPostingsTable>;

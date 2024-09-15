import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class ProjectsTable extends BaseTable {
  readonly table = "projects";
  columns = this.setColumns((t) => ({
    projectId: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    projectName: t.string().trim(),
    description: t.text(),
    targetAmount: t.decimal(),
    amountRaised: t.decimal().default(0),
    startDate: t.date(),
    endDate: t.date(),
    projectType: t.enum("project_type", [
      "Scholarship",
      "Research",
      "Infrastructure",
    ]),
    createdBy: t.uuid().foreignKey(() => UserTable, "id"),
    alumniDonors: t.array(t.uuid()),
  }));
}

export type Project = Selectable<ProjectsTable>;
export type ProjectUpdate = Updatable<ProjectsTable>;
export type ProjectForQuery = Queryable<ProjectsTable>;

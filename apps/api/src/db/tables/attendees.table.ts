import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { EventsTable } from "./events.table";

export class AttendeesTable extends BaseTable {
  readonly table = "attendees";

  columns = this.setColumns((t) => ({
    id: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    eventId: t.uuid().foreignKey(() => EventsTable, "eventId"),
    name: t.string().trim(),
    email: t.string().trim().email(),
    mobileNumber: t.string().trim(),
    graduationYear: t.integer().nullable(),
    remarks: t.string().trim().nullable(),
    attendeeType: t.enum("Attendees_type", ["student", "alumni", "guest"]),
  }));
}

export type Attendees = Selectable<AttendeesTable>;
export type AttendeesUpdate = Updatable<AttendeesTable>;
export type AttendeesForQuery = Queryable<AttendeesTable>;

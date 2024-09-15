import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class EventsTable extends BaseTable {
  readonly table = "events";
  columns = this.setColumns((t) => ({
    eventId: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    eventTitle: t.string().trim(),
    eventDate: t.string().trim(),
    eventType: t.string().trim(),
    eventTime: t.string().trim(),
    capacity: t.string().trim(),
    description: t.text(),
    location: t.string().trim(),
    organizerId: t
      .uuid()
      .foreignKey(() => UserTable, "id")
      .nullable(),
  }));
}

export type Event = Selectable<EventsTable>;
export type EventUpdate = Updatable<EventsTable>;
export type EventForQuery = Queryable<EventsTable>;

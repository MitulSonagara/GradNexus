import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class SuccessStoriesTable extends BaseTable {
  readonly table = "success_stories";
  columns = this.setColumns((t) => ({
    storyId: t
        .uuid()
        .primaryKey().default(t.sql`gen_random_uuid()`),
    alumniId: t
        .uuid()
        .foreignKey(() => UserTable, 'id'),
    storyTitle: t.string().trim(),
    storyContent: t.text(),
    postedAt: t.timestamp(),
  }));
}

export type SuccessStory = Selectable<SuccessStoriesTable>;
export type SuccessStoryUpdate = Updatable<SuccessStoriesTable>;
export type SuccessStoryForQuery = Queryable<SuccessStoriesTable>;

import { change } from '../dbScript';

change(async (db) => {
  await db.createEnum('public.status', ['Submitted', 'interview', 'Hired', 'Rejected']);

  await db.createTable('success_stories', (t) => ({
    story_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    alumni_id: t.uuid().foreignKey('alumni_profile', 'alumni_id'),
    story_title: t.string(),
    story_content: t.text(),
    posted_at: t.timestamp(),
  }));
});

change(async (db) => {
  await db.createTable('job_application', (t) => ({
    application_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    job_id: t.uuid().foreignKey('job_postings', 'job_id'),
    alumni_id: t.uuid().foreignKey('alumni_profile', 'alumni_id'),
    application_date: t.timestamp(),
    status: t.enum('status'),
  }));
});

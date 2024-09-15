import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('events', (t) => ({
    eventTitle: t.add(t.string()),
    eventType: t.add(t.string()),
    eventTime: t.add(t.string()),
    capacity: t.add(t.string()),
    attendeesId: t.add(t.array(t.uuid().unique())),
    ...t.drop(t.name('event_date').date()),
    ...t.add(t.name('event_date').string()),
    eventName: t.drop(t.varchar(255)),
    registrationUrl: t.drop(t.varchar(255).nullable()),
  }));

  await db.changeTable('job_postings', (t) => ({
    applicationUrl: t.drop(t.varchar(255).nullable()),
  }));

  await db.changeTable('projects', (t) => ({
    projectDype: t.add(t.enum('project_type')),
    projectType: t.drop(t.enum('public.project_type')),
  }));

  await db.changeTable('user', (t) => ({
    passoutYear: t.drop(t.varchar(255).nullable()),
    lastLoginAt: t.drop(t.timestamp().nullable()),
  }));
});

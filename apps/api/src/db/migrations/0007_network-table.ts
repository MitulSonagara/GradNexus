import { change } from '../dbScript';

change(async (db) => {
  await db.changeEnumValues('public.status', ['Submitted', 'interview', 'Hired', 'Rejected'], ['Submitted', 'Interview', 'Hired', 'Rejected']);

  await db.changeTable('donations', (t) => ({
    createAt: t.add(t.timestamp().default(t.sql`now()`)),
    updatedAt: t.add(t.timestamp().default(t.sql`now()`)),
    receiptUrl: t.drop(t.varchar(255).nullable()),
  }));

  await db.changeTable('projects', (t) => ({
    projectType: t.add(t.enum('project_type')),
    ...t.drop(t.name('alumni_donors').integer().default(t.sql`0`)),
    ...t.add(t.name('alumni_donors').array(t.uuid())),
    projectDype: t.drop(t.enum('public.project_type')),
  }));
});

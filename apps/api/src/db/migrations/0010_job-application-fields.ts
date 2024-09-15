import { change } from '../dbScript';

change(async (db) => {
  await db.changeEnumValues('public.status', ['Pending', 'Active'], ['Submitted', 'Interview', 'Hired', 'Rejected']);

  await db.changeTable('job_application', (t) => ({
    resumeUrl: t.add(t.string()),
    coverLetter: t.add(t.text()),
  }));

  await db.changeTable('networking_hub', (t) => ({
    status: t.drop(t.enum('public.status')),
  }));
});

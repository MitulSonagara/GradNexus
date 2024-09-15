import { change } from '../dbScript';

change(async (db) => {
  await db.createEnum('public.status_from', ['Sent', 'connected', 'Pending']);
});

change(async (db) => {
  await db.changeTable('networking_hub', (t) => ({
    statusFrom1: t.add(t.enum('status_from')),
    statusFrom2: t.add(t.enum('status_from')),
  }));
});

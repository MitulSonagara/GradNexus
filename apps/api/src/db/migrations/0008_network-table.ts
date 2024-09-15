import { change } from '../dbScript';

change(async (db) => {
  await db.changeEnumValues('public.status', ['Submitted', 'Interview', 'Hired', 'Rejected'], ['Pending', 'Active']);

  await db.createEnum('public.Attendees_type', ['student', 'alumni', 'guest']);

  await db.createEnum('public.connection_type', ['Professional', 'Mentorship']);

  await db.changeTable('events', (t) => ({
    attendeesId: t.drop(t.array(t.uuid())),
  }));
});

change(async (db) => {
  await db.createTable('attendees', (t) => ({
    id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    eventId: t.uuid().foreignKey('events', 'eventId'),
    name: t.string(),
    email: t.string(),
    mobileNumber: t.string(),
    graduationYear: t.integer().nullable(),
    remarks: t.string().nullable(),
    attendeeType: t.enum('Attendees_type'),
  }));

  await db.createTable('networking_hub', (t) => ({
    connectionId: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    alumniId1: t.uuid().foreignKey('user', 'id'),
    alumniId2: t.uuid().foreignKey('user', 'id'),
    connectionType: t.enum('connection_type'),
    status: t.enum('status'),
  }));
});

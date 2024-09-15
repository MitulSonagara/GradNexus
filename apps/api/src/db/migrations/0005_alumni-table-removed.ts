import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('user', (t) => ({
    department: t.add(t.string().nullable()),
    linkedin_profile: t.add(t.string().nullable()),
    graduation_year: t.add(t.integer().nullable()),
    current_location: t.add(t.string().nullable()),
    mobileNumber: t.add(t.string().nullable()),
    profilePicture: t.add(t.string().nullable()),
    currCompany: t.add(t.string().nullable()),
    currRole: t.add(t.string().nullable()),
    collegeId: t.add(t.string().nullable()),
    passoutYear: t.add(t.string().nullable()),
    lastLoginAt: t.add(t.timestamp().nullable()),
  }));

  await db.changeTable('donations', (t) => ({
    ...t.drop(
      t.foreignKey(
        ['donator'],
        'public.alumni_profile',
        ['alumni_id'],
      ),
    ),
    ...t.add(
      t.foreignKey(
        ['donator'],
        'user',
        ['id'],
      ),
    ),
  }));

  await db.changeTable('job_application', (t) => ({
    ...t.drop(
      t.foreignKey(
        ['alumni_id'],
        'public.alumni_profile',
        ['alumni_id'],
      ),
    ),
    ...t.add(
      t.foreignKey(
        ['alumni_id'],
        'user',
        ['id'],
      ),
    ),
  }));

  await db.changeTable('job_postings', (t) => ({
    ...t.drop(
      t.foreignKey(
        ['posted_by'],
        'public.alumni_profile',
        ['alumni_id'],
      ),
    ),
    ...t.add(
      t.foreignKey(
        ['posted_by'],
        'user',
        ['id'],
      ),
    ),
  }));

  await db.changeTable('payment_transactions', (t) => ({
    ...t.drop(
      t.foreignKey(
        ['alumni_id'],
        'public.alumni_profile',
        ['alumni_id'],
      ),
    ),
    ...t.add(
      t.foreignKey(
        ['alumni_id'],
        'user',
        ['id'],
      ),
    ),
  }));

  await db.changeTable('success_stories', (t) => ({
    ...t.drop(
      t.foreignKey(
        ['alumni_id'],
        'public.alumni_profile',
        ['alumni_id'],
      ),
    ),
    ...t.add(
      t.foreignKey(
        ['alumni_id'],
        'user',
        ['id'],
      ),
    ),
  }));
});

change(async (db) => {
  await db.dropTable('alumni_profile', (t) => ({
    alumniId: t.uuid().primaryKey().foreignKey('user', 'id').default(t.sql`gen_random_uuid()`),
    department: t.varchar(255).nullable(),
    linkedinProfile: t.varchar(255).nullable(),
    graduationYear: t.integer().nullable(),
    currentLocation: t.varchar(255).nullable(),
    mobileNumber: t.varchar(255).nullable(),
    profilePicture: t.varchar(255).nullable(),
    currCompany: t.varchar(255).nullable(),
    currRole: t.varchar(255).nullable(),
    collegeId: t.varchar(255).nullable(),
    passoutYear: t.varchar(255).nullable(),
    lastLoginAt: t.timestamp().nullable(),
    createdAt: t.timestamp().nullable().default(t.sql`now()`),
    updatedAt: t.timestamp().nullable().default(t.sql`now()`),
  }));
});

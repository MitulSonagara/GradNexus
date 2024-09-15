import { change } from '../dbScript';

change(async (db) => {
  await db.createEnum('public.project_type', ['Scholarship', 'Research', 'Infrastructure']);

  await db.createEnum('public.donation_type', ['One-time', 'Recurring']);

  await db.createEnum('public.frequency', ['Monthly', 'Quarterly', 'Yearly']);

  await db.createEnum('public.payment_method', ['Credit Card', 'UPI', 'Bank Transfer']);

  await db.createEnum('public.payment_status', ['Pending', 'Completed', 'Failed']);

  await db.createTable('alumni_profile', (t) => ({
    alumni_id: t.uuid().primaryKey().foreignKey('user', 'id'),
    department: t.string(),
    linkedin_profile: t.string().nullable(),
    graduation_year: t.integer(),
    current_location: t.string().nullable(),
    mobileNumber: t.string().nullable(),
    profilePicture: t.string().nullable(),
    currCompany: t.string().nullable(),
    currRole: t.string().nullable(),
    collegeId: t.string().nullable(),
    passoutYear: t.string().nullable(),
    lastLoginAt: t.timestamp().nullable(),
    createdAt: t.timestamps().createdAt.nullable(),
    updatedAt: t.timestamps().updatedAt.nullable(),
  }));

  await db.createTable('events', (t) => ({
    event_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    event_name: t.string(),
    description: t.text(),
    event_date: t.date(),
    location: t.string(),
    organizer_id: t.uuid().foreignKey('user', 'id').nullable(),
    registration_url: t.string().nullable(),
  }));

  await db.changeTable('user', (t) => ({
    profilePicture: t.drop(t.varchar(255).nullable()),
    lastLoginAt: t.drop(t.timestamp().nullable()),
    mobileNumber: t.drop(t.varchar(255).nullable()),
    currCompany: t.drop(t.varchar(255).nullable()),
    currRole: t.drop(t.varchar(255).nullable()),
    collegeId: t.drop(t.varchar(255).nullable()),
    passoutYear: t.drop(t.varchar(255).nullable()),
    department: t.drop(t.varchar(255).nullable()),
  }));
});

change(async (db) => {
  await db.createTable('projects', (t) => ({
    project_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    project_name: t.string(),
    description: t.text(),
    target_amount: t.decimal(),
    amount_raised: t.decimal().default(0),
    start_date: t.date(),
    end_date: t.date(),
    project_type: t.enum('project_type'),
    created_by: t.uuid().foreignKey('user', 'id'),
    alumni_donors: t.integer().default(0),
  }));

  await db.createTable('job_postings', (t) => ({
    job_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    posted_by: t.uuid().foreignKey('alumni_profile', 'alumni_id'),
    job_title: t.string(),
    company_name: t.string(),
    location: t.string(),
    description: t.text(),
    salary_range: t.string(),
    job_type: t.string(),
    application_url: t.string().nullable(),
    created_at: t.timestamp(),
  }));

  await db.createTable('payment_transactions', (t) => ({
    transaction_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    alumni_id: t.uuid().foreignKey('alumni_profile', 'alumni_id'),
    amount: t.decimal(10, 2),
    payment_method: t.enum('payment_method'),
    payment_status: t.enum('payment_status'),
    transaction_date: t.timestamp(),
  }));
});

change(async (db) => {
  await db.createTable('donations', (t) => ({
    donation_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    project_id: t.uuid().foreignKey('projects', 'project_id'),
    payment_id: t.uuid().foreignKey('payment_transactions', 'transaction_id'),
    donator: t.uuid().foreignKey('alumni_profile', 'alumni_id'),
    amount: t.decimal(),
    donation_type: t.enum('donation_type'),
    frequency: t.enum('frequency'),
    donation_date: t.timestamp(),
    receipt_url: t.string().nullable(),
  }));
});

import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('user', (t) => ({
    password: t.add(t.string()),
    role: t.add(t.string()),
    mobileNumber: t.add(t.string().nullable()),
    currCompany: t.add(t.string().nullable()),
    currRole: t.add(t.string().nullable()),
    collegeId: t.add(t.string().nullable()),
    passoutYear: t.add(t.string().nullable()),
    department: t.add(t.string().nullable()),
    email: t.change(t.varchar(255).nullable(), t.string()),
    name: t.change(t.varchar(255).nullable(), t.string()),
  }));
});

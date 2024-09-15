import { db } from "./db.config";
import { faker } from '@faker-js/faker';

async function seedUsers() {
	for (let i = 0; i < 50; i++) {
		await db.user.create({
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.internet.password(), // Ideally, you'd hash this before storing
			role: 'Alumni',
			isVerified: faker.datatype.boolean(),
			department: faker.commerce.department(),
			linkedinProfile: faker.internet.url(),
			graduationYear: faker.date.past(10).getFullYear(), // Random past graduation year
			currentLocation: faker.address.city(),
			mobileNumber: faker.phone.number(),
			profilePicture: faker.image.avatar(),
			currCompany: faker.company.name(),
			currRole: faker.name.jobTitle(),
			collegeId: faker.datatype.uuid(),
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
}

export const seed = async () => {
	seedUsers()
		.then(() => {
			console.log('Seeding complete');
			process.exit(0);
		})
		.catch((error) => {
			console.error('Error seeding users:', error);
			process.exit(1);
		});


	await db.$close();
};

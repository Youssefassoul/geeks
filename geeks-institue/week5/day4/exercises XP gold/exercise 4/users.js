import { faker } from "@faker-js/faker";

export const users = [];

export function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country(),
  };

  users.push(user);
  console.log("✅ Fake user added:", user);
}

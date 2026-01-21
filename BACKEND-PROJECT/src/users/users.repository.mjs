import userData from "../data/userdb.json" assert { type: "json" };
import { Identifier } from "../utils/identifier.mjs";

export class UsersRepository {
  constructor() {
    this.users = userData;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async createUser(user) {
    user.id = Identifier.generate()

    const timeStamp = new Date().toISOString();

    user.created_At = timeStamp;
    user.updated_At = timeStamp

    this.users.push(user);

    return this.users;
  }

  async findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  async getAllUsers() {
    return this.users;
  }

  async updateUser(id, updatedFields) {
    const userIndex = this.users.findIndex((user) => user.id === id) || null;

    if (userIndex === -1) {
      return false;
    }

    updatedFields.created_At = new Date().toISOString()

    this.users[userIndex] = { ...this.users[userIndex], ...updatedFields };

    return this.users[userIndex];
  }

  async deleteUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return "User not found";
    }

    this.users.splice(userIndex, 1);

    return true;
  }
}

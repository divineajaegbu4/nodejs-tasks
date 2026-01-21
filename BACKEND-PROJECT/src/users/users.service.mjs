import { UsersRepository } from "./users.repository.mjs";

export class UsersServices {
    constructor() {
        this.usersRepository = UsersRepository
    }

    async findByEmail(email) {
        return await this.usersRepository.findByEmail(email)
    }

    async createUser(user) {
        return await this.usersRepository.createUser(user)
    }

    async findById(id) {
        return await this.usersRepository.findById(id)
    }

    async getAllUsers() {
        return await this.usersRepository.getAllUsers()
    }

    async updatedUsers(id, updatedFields) {
        return await this.usersRepository.updatedFields(id, updatedFields)
    }

    async deleteUsers(id) {
        return await this.usersRepository.deleteUsers(id)
    }
}
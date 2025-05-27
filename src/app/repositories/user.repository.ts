import { User } from "../../models";
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async isEmailTaken(email: string) {
    return this.exists({ email });
  }

  async createUser(data: { email: string; password: string; role: 'user' | 'admin' }) {
    return this.create(data);
  }
}

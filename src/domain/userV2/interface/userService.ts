import type { User } from '@/domain/userV2/interface/user';

export interface UserService {
  getUser: () => Promise<User>;
  rename: (id: string, name: string) => Promise<boolean>;
}

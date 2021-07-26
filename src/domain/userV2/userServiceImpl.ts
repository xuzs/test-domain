import type { UserService } from './interface/userService';
import type { User } from '@/domain/userV2/interface/user';

import { Injectable } from '@/core/decorator/injectable';
import { AutoWired } from '@/core/decorator/autoWired';
import HttpService from '@/service/httpService';
import UserDomain from '@/domain/userV2/userDomain';

@Injectable()
class UserServiceImpl implements UserService {
  @AutoWired(HttpService)
  private httpService!: HttpService;

  getUser(): Promise<User> {
    const userDomain = new UserDomain();

    return userDomain.getUserId()
  }

  rename(id: string, name: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export default UserServiceImpl;

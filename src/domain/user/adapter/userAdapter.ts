import type { UserEntity } from '@/domain/user/interface/entity/user';

import ServiceBasic from '@/core/serviceBasic';
import { AutoWired } from '@/core/decorator/autoWired';

import HttpService from '@/service/httpService';

export class UserAdapter extends ServiceBasic {
  @AutoWired(HttpService)
  httpService!: HttpService;

  handle(user: UserEntity) {
    if (user.old) {
      // TODO SOMETHING
    } else {
      // TODO SOMETHING
    }
  }
}

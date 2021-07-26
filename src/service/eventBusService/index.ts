import type { UserEntity } from '@/domain/user/interface/entity/user';

import Eventemitter3 from 'eventemitter3';

export default class EventBusService extends Eventemitter3 {
  constructor() {
    super();
  }

  init() {}

  updateUserType(_id: string, userInfo: Partial<UserEntity>) {
    this.emit('update:user', userInfo);
  }
}

import type { IUserService } from '@/domain/user/services/userService.interface';
import type { UserEntity } from '@/domain/user/interface/entity/user';
import type { CancelToken } from 'axios';

import { AutoWired, Component } from '@/core/decorator/autoWired';

import ServiceBasic from '@/core/serviceBasic';
import HttpService from '@/service/httpService';
import EventBusService from '@/service/eventBusService';
import UserUtils from '../utils';

import './boardService';

/**
 * TODO 调用数据总线
 */

@Component
@Aspect
class UserService extends ServiceBasic implements IUserService {
  @AutoWired(HttpService)
  httpService!: HttpService;

  @AutoWired(HttpService)
  eventBusService!: EventBusService;

  constructor() {
    super();
  }

  // case1 old
  async getUserInfo(id: string, token: CancelToken) {
    const user = await this.httpService.get<UserEntity>(`/user/${id}`, {
      cancelToken: token,
    });

    if (UserUtils.isVip(user.type)) {
      throw new Error('限制用户，让边界处理器生效');
    }
    this.eventBusService.updateUserType(user.id, user);

    return user;
  }

  // case1 获取
  async getNewUserInfo(id: string, token: CancelToken) {
    const user = await this.httpService.get<UserEntity>(`/user/${id}`, {
      cancelToken: token,
    });

    if (UserUtils.isVip(user.type)) {
      throw new Error('限制用户，让边界处理器生效');
    }
    this.eventBusService.updateUserType(user.id, user);

    return user;
  }

  @Before()
  @After()
  async getBoardsById() {}
}

export default UserService;

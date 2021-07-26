import UserService from '@/domain/user/services/userService';
import RepositoryService from '@/service/repositoryService';
import { AutoWired } from '@/core/decorator/autoWired';

@Controller()
export default class BizController {
  @AutoWired()
  repositoryService!: RepositoryService;

  constructor(private readonly userService: UserService) {}

  @KioLog('event')
  doSomething() {
    return this.userService.getNewUserInfo();
  }

  @KioLog('pv')
  doSomethingAdapter(version: 'v1.0' | 'v2.0') {
    switch (version) {
      case 'v1.0':
        this.userService.getNewUserInfo();
        this.repositoryService.setItem('item');
        break;
      case 'v2.0':
        this.userService.getNewUserInfo();
        break;
      default:
        break;
    }
  }
}

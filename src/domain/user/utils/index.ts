import { USER_TYPE } from '../enum';

export default class UserUtils {
  public static isVip(type: USER_TYPE): type is USER_TYPE {
    return type === USER_TYPE.VIP;
  }
}

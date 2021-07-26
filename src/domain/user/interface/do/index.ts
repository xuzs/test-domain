import type { UserEntity } from '../entity/user';
import type { Board } from '../entity/board';

export interface UserDO extends UserEntity {
  boards: Board[];
}

import type { USER_TYPE } from '../../enum';

export interface UserEntity {
  id: string;
  name: string;
  type: USER_TYPE;
  old?: boolean;
}

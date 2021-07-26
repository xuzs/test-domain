import { ERROR_CODE } from '@/errorboundary/errorCode';

/**
 *
 * @param error
 */
export const errorBoundary = (error: ERROR_CODE) => {
  switch (error) {
    case ERROR_CODE.ITEM_MISSING:
      Messsage.error('');
      break;
    case ERROR_CODE.BRAND_SOLD_OUT:
      console.log(1);
      break;
    default:
      break;
  }
};

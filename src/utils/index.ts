export class TypeGuard {
  isVip(userType: number | string): userType is number {
    return typeof userType === 'number';
  }
}

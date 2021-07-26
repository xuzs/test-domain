export default abstract class ServiceBasic<T = any> {
  do(name: T): T {
    return name;
  }
}

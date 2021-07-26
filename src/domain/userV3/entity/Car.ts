import type AgeVO from '../vo/AgeVO';
import { Entity, BaseDomainEntity, UniqueEntityID, Result } from 'types-ddd';

interface CarProp extends BaseDomainEntity {
  age: AgeVO;
}

class Car extends Entity<CarProp> {
  private constructor(props: CarProp, id?: UniqueEntityID) {
    super(props, id);
  }

  get age() {
    return this.props.age.value;
  }

  public static create(props: CarProp, id?: UniqueEntityID): Result<Car> {
    // Your business validation logic
    // You should use rules before create entity instance
    if (props.age.value < 100) {
      return Result.fail<Car>('The car is so old');
    }
    return Result.ok<Car>(new Car(props, id));
  }
}

export default Car;

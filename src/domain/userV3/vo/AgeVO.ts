import { ValueObject, Result } from 'types-ddd';

interface Prop {
  value: number;
}
class AgeVO extends ValueObject<Prop> {
  constructor(prop: Prop) {
    super(prop);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(age: number): Result<AgeVO> {
    // must have less than 130 years old
    if (age > 130) {
      return Result.fail<AgeVO>("There's no Person like Methuselah");
    }

    return Result.ok<AgeVO>(new AgeVO({ value: age }));
  }
}

export default AgeVO;

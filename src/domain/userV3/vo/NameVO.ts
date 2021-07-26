import { ValueObject, Result } from 'types-ddd';

interface Prop {
  value: number;
}
class NameVO extends ValueObject<Prop> {
  constructor(prop: Prop) {
    super(prop);
  }

  get value(): number {
    return this.props.value;
  }

  public static create(age: number): Result<NameVO> {
    // must have less than 130 years old
    if (age > 130) {
      return Result.fail<NameVO>("There's no Person like Methuselah");
    }

    return Result.ok<NameVO>(new NameVO({ value: age }));
  }
}

export default NameVO;

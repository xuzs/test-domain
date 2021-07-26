import { AggregateRoot, UniqueEntityID, Result, IDomainEvent } from 'types-ddd';
import type AgeVO from '@/domain/userV3/vo/AgeVO';
import type NameVO from '@/domain/userV3/vo/NameVO';

interface Props {
  name: NameVO;
  age: AgeVO;
}

class UserAggregate extends AggregateRoot<Props> {
  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): NameVO {
    return this.props.name;
  }

  get age(): AgeVO {
    return this.props.name;
  }

  public addEvent(domainEvent: IDomainEvent) {
    this.addDomainEvent(domainEvent);
  }

  public static create(props: Props, id?: UniqueEntityID): Result<UserAggregate> {
    return Result.ok<UserAggregate>(new UserAggregate(props, id));
  }
}

export default UserAggregate;

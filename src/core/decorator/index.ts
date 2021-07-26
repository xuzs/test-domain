type ClassDecorator = 'Component' | 'Injectable' | 'Interaction' | 'Service';

export const makeClassDecorator = (type: ClassDecorator) => {
  return type;
};

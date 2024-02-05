namespace App {
  // Bind `this` decorator

  export function AutoBind(
    _target: any,
    _name: string,
    propDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const oldFunc = propDescriptor.value;

    const updatedDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = oldFunc.bind(this);
        return boundFn;
      },
    };
    return updatedDescriptor;
  }
}

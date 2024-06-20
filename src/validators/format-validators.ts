export default (validators: any[]) => {
  let pathValueValidators = {};

  validators.forEach((validator) => {
    pathValueValidators = { ...pathValueValidators, ...validator };
  });

  const destination = {};
  for (var key in pathValueValidators) {
    if (pathValueValidators.hasOwnProperty(key)) {
      destination["/api" + key] = pathValueValidators[key];
    }
  }

  return destination;
};

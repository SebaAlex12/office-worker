export const mapReverse = (array, fn) => {
  return array.reduceRight(function (result, el) {
    result.push(fn(el));
    return result;
  }, []);
};
export const sortArray = (array, property, direction) => {
  direction = direction || 1;
  array.sort(function compare(a, b) {
    let comparison = 0;
    // console.log("element a", a);
    // console.log("element b", b);
    if (a[property] > b[property]) {
      comparison = 1 * direction;
    } else if (a[property] < b[property]) {
      comparison = -1 * direction;
    }
    return comparison;
  });
  return array;
};
export const formValidator = (value, params) => {
  let logic = true;
  let message = "";

  if (params.minLength) {
    if (value.length < params.minLength[0]) {
      logic = false;
      message = params.minLength[1];
    }
  }

  if (params.required) {
    if (value.length === 0) {
      logic = false;
      message = params.required[1];
    }
  }

  return [logic, message];
};

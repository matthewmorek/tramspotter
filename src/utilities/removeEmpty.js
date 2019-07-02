const removeEmpty = obj =>
  Object.keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined && obj[k] !== '') // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? Object.assign(newObj, { [k]: removeEmpty(obj[k]) }) // Recurse.
          : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
      {}
    );

export default removeEmpty;

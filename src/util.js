const { omitBy, isEmpty } = require('lodash');

const removeEmpty = obj => omitBy(obj, isEmpty);

const authenticated = next => (root, args, context, info) => {
  if (!context.authenticated) {
      throw new Error(`Autenticación requerida`);
  }

  return next(root, args, context, info);
}

module.exports = {
  removeEmpty,
  authenticated
};

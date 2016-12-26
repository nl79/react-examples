export default function ( { dispatch }) {
  return function(next) {
    return function (action) {
      // Action has no payload, or the payload is not a promise.
      if(!action.payload || !action.payload.then) {
        return next(action);
      }
      action.payload.then(function(res) {
        return dispatch({...action, payload: res.data});
      });
    }
  }
}

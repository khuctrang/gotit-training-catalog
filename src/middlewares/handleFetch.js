const handleFetch = (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  if (!Object.prototype.hasOwnProperty.call(action, 'promise')) return next(action);

  // console.log('REQUEST//SUCCESS//FAILURE PATTERN');
  store.dispatch({ type: `${action.type}_REQUEST` });
  try {
    const result = await action.promise;
    /* console.log(action);
    console.log(result); */
    // return middleware result

    if (result.statusCode && (result.statusCode > 299 || result.statusCode < 200)) {
      throw Error(result.message || 'Request failed');
    }
    store.dispatch({ type: `${action.type}_SUCCESS`, payload: result });
    return {
      success: true,
      result,
    };
  } catch (e) {
    const { message } = await e;

    store.dispatch({ type: `${action.type}_FAILURE`, payload: message });
    // if e is array => only take the first element
    // return middleware result
    return {
      success: false,
      message,
    };
  }
};

export default handleFetch;

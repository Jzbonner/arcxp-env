const deferThis = (deferredObj) => {
  if (typeof deferredObj === 'object') {
    window.deferUntilKnownAuthState = window.deferUntilKnownAuthState || [];
    window.deferUntilKnownAuthState.push(deferredObj);
  } else {
    // eslint-disable-next-line no-console
    console.error('Tried to defer a non-object:', typeof deferredObj, deferredObj);
  }
};

export default deferThis;

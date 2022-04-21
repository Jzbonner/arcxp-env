const GetConnextLocalStorageData = (siteCode, configCode, environment, localStoragePrefix = 'connext_user_data') => {
  const connextLSLookup = `${localStoragePrefix}_${siteCode}_${configCode}_${environment.toUpperCase()}`;
  let lsResponse = {};
  if (typeof window !== 'undefined' && window.localStorage !== 'undefined') {
    const connextLS = window.localStorage.getItem(connextLSLookup);
    if (connextLS && connextLS.indexOf('{') === 0) {
      lsResponse = JSON.parse(connextLS);
    }
  }
  return lsResponse;
};

export default GetConnextLocalStorageData;

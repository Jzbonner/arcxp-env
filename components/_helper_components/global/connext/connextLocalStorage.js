const GetConnextLocalStorageData = (siteCode, configCode, environment) => {
    const connextLSLookup = `connext_user_data_${siteCode}_${configCode}_${environment.toUpperCase()}`;
    let lsResponse = {};
    if (typeof window !== 'undefined' && window.localStorage !== 'undefined') {
        const connextLS = window.localStorage.getItem(connextLSLookup);
        if (connextLS) {
            lsResponse = JSON.parse(connextLS);
        }
    }
    return lsResponse;
};

export default GetConnextLocalStorageData;
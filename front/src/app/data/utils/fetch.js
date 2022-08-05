import config from '../../../config'

const axios = require('axios');

export default ( url, method, body, extraHeaders ) => {
    let options = '';
    if(method === "GET"){
        options = {
            method,
            url,
            responseType: 'json',
            withCredentials: true,
        }
    } else {
        options = {
            method,
            url,
            data: body,
            responseType: 'json',
            withCredentials: true,
        }
    }
    options.headers = requestHeaders(extraHeaders);

    var starttime = new Date().getTime();
    return axios( options )
        .then( res => {
            var endDate = new Date();
            var endtime = endDate.getTime();
            var timeDiff = endtime - starttime;
            if(timeDiff > 500 || !config.PRODUCTION)
                console.log(url," (",timeDiff,"ms)")
            return parseStatus( res.status, res)
        } )
        .catch((e) => {
            return parseStatus( 200, e.response);
        })
}

function parseStatus( status, res ) {
    return new Promise( ( resolve, reject ) => {
        if ( status >= 200 && status < 300 ) {
            resolve( res.data );
        } else {
            resolve({success:0, error:status, response:[]});
        }
    } );
}

function requestHeaders(extraHeaders) {

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "site-id" : config.SITE_ID
    }
    if(typeof document !== 'undefined'){
       const signUpToken = Util.getCookie('SIGN_UP_TOKEN');
       const ssoToken = Util.getCookie('SSO_TOKEN');

       if(ssoToken) headers = {...headers, 'x-sso-token':ssoToken.replace(/["']/g, "")}
       if(signUpToken) headers = {...headers, 'x-signup-token':signUpToken.replace(/["']/g, "")}
    }
    if (extraHeaders) {
      headers = { ...headers, ...extraHeaders }
    }
    return headers;
}

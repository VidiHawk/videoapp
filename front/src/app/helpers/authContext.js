import React from "react";

const authContext = React.createContext({
    authenticated: false,
    sendAnalytics: () => {},
    scrollInViewPort: () =>{},
    theme: 'light',
    changeTheme: () =>{}
});

export default authContext;

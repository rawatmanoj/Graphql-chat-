import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles } from '@fluentui/react';
import reportWebVitals from './reportWebVitals';
import {  ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobalProvider } from './context/GlobalContext';
// Inject some global styles
mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

ReactDOM.render(
<ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
  </GoogleOAuthProvider>
</ApolloProvider>, 
document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

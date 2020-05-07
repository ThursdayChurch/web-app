import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
} from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/css/styles.css';
import {
    ClientProvider,
} from './client';
import {
    AuthProvider,
} from './auth';
import { SandboxProvider } from './sandbox';

ReactDOM.render(
    <ClientProvider>
        <BrowserRouter>
            <AuthProvider>
                <SandboxProvider>
                    <App />
                </SandboxProvider>
            </AuthProvider>
        </BrowserRouter>
    </ClientProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

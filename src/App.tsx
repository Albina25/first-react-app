import './App.css';
import React from 'react';
import { createHistoryRouter } from 'atomic-router';
import { RouterProvider, Route } from 'atomic-router-react';

import { routes } from './router/index.ts';

const router = createHistoryRouter({ routes });

const App: React.FC = () => {
    return (
        <RouterProvider router={router}>
            <Route route={homeRoute} view={HomePage} />
        </RouterProvider >
    );
};


/*import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecordDetailsPage from "./pages/RecordDetailsPage.tsx";
import { routes } from "./router/index.ts"
import {TablePage} from "./pages/TablePage.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {routes.map((route, index) =>
                        <Route
                           key={index}
                           exact={route.exact}
                           path={route.path}
                           element={React.createElement(route.component)}
                        />
                    )}
                    {/!*<Route path="/" element={<TablePage />} />
                    <Route exact path="/details/:id" element={<RecordDetailsPage />} />*!/}
                </Routes>
            </div>
        </BrowserRouter>
    );
};*/

export default App;

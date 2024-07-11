import './App.css';
import React from 'react';
import { RouterProvider } from 'atomic-router-react';

import { router } from "./router";
import {Pages} from "./pages";

const App: React.FC = () => {
    return (
        <RouterProvider router={router}>
            <Pages />
            {/*<Route route={tableRoute} view={TablePage} />
            <Route route={detailsRoute} view={RecordDetailsPage} />*/}
        </RouterProvider>
    );
};

export default App;

import "./App.css";
import React from "react";
import { RouterProvider } from "atomic-router-react";

import { router } from "./router";
import { Pages } from "./pages";

const App: React.FC = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};

export default App;

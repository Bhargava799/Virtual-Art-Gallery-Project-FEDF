import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes1 from "./components/Routes1";
import DataContent from "./components/DataContent"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/Virtual-Art-Gallery-Project-FEDF">
    <DataContent>
      <Routes1 />
    </DataContent>
    </BrowserRouter>
  </React.StrictMode>
);

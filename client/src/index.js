import React from "react";
//import * as ReactDOMClient from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";

// const constainer = document.getElementById("root");
// const root = ReactDOMClient.createRoot(constainer);
// root.render(<App />);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

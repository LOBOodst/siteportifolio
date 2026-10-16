import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "@fontsource-variable/archivo/wdth.css";
import "./index.css";

// For the people who open DevTools on a portfolio (hi, fellow programmers).
console.info(
  "%cBP_HoschAlef%c selected.\nSource: https://github.com/LOBOodst/siteportifolio\nTry ↑ ↑ ↓ ↓ ← → ← → B A on the page.",
  "background:#ffb21a;color:#16181d;font-weight:700;padding:2px 6px",
  "color:inherit",
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

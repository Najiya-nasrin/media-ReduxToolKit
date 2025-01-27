import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
import "./src/index.css";
import { Provider } from "react-redux";
import { store } from './src/store'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);

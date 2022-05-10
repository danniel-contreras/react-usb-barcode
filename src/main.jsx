import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import 'reactjs-crontab/dist/index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer  position="top-right"
      autoClose={5000}
      newestOnTop={false}
      closeOnClick={true}
      pauseOnVisibilityChange
      draggable
      pauseOnHover />
    </Provider>
  </React.StrictMode>
);

/** @format */

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import TopNav from "../components/TopNav";
import { Provider } from "../context";

function App({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer
        autoClose={1500}
        pauseOnFocusLoss={false}
        position="top-right"
      />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

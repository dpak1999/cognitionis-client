/** @format */

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import TopNav from "../components/TopNav";

function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-right" />
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}

export default App;

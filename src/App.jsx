import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Roteador from "./Roteador";

function App() {
  return (
    <>
      <Roteador />
      <ToastContainer />
    </>
  );
}

export default App;

import "./App.css";
import ReactRouter from "./routes";
import { useSelector } from "react-redux";
import { Auth } from "./pages/Auth";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <>{auth?.isLoggedIn ? <ReactRouter /> : <Auth />}</>
    </>
  );
}

export default App;

import './App.css';
import ReactRouter from './routes';
import { useSelector } from 'react-redux';
import { Auth } from './pages/Auth';
import { useBeforeunload } from 'react-beforeunload';
import { getBox } from './api/box';

function App() {
  const auth = useSelector((state) => state.auth);
  useBeforeunload((event) => {
    if (getBox()) {
      event.preventDefault();
    }
  });
  return (
    <>
      <>{!auth?.isLoggedIn ? <ReactRouter /> : <Auth />}</>
    </>
  );
}

export default App;

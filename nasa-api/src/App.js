import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from "./components"
import {Homepage, Error, Apod, Wildfire, Login, Epic} from "./pages"
import Auth from "./auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Auth><Homepage /></Auth>}></Route>
        <Route path="/apod" element={<Auth><Apod /></Auth>}></Route>
        <Route path="/wildfire" element={<Auth><Wildfire /></Auth>}></Route>
        <Route path="/epic" element={<Auth><Epic /></Auth>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

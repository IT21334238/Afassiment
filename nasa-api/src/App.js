import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from "./components"
import {Homepage, Error, Apod, Wildfire, Login, Epic} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/apod" element={<Apod />}></Route>
        <Route path="/wildfire" element={<Wildfire />}></Route>
        <Route path="/epic" element={<Epic />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

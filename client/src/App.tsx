import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Code from "./pages/Code";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/*" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

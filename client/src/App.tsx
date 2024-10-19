import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Code from "./pages/Code";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

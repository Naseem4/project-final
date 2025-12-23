import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Login";
import WatchPage from "./containers/WatchPage/WatchPage";
import BookingContainer from "./containers/BookingContainer/BookingContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
       <Route path="/WatchPage" element={<WatchPage />} />
      <Route path="/BookingContainer" element={<BookingContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

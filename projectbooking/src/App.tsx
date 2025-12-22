import BookingContainer from "./containers/BookingContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BookingContainer />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;

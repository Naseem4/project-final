import WatchPage from "./containers/WatchPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (

    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<WatchPage />} />
      </Routes>
    </BrowserRouter>
    
     
      
    
  )
}

export default App

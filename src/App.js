import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserManagement from './Components/UserManagement/UserManagement';
import UserDetails from './Components/UserDetails/UserDetails';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

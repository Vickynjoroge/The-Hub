import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login/Login';
import SignUp from './component/Login/Signup';
import Navbar from './component/Navbar/Navbar'

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar user={user} setUser={setUser} /> */}
      <Routes>
        {!user && (
          <>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<SignUp setUser={setUser}/>}/>
          </>          
        )}

        {user && (
          <>
           <Navbar user={user} setUser={setUser} />
          </>
        )}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

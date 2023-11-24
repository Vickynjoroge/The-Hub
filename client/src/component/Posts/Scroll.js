import React from "react";
// import { useState, useRef } from "react";
import Footer from "./Footer";
import Posts from "./Posts";
import AddPost from "./AddPost";
// import NavBar from "../Navbar/Navbar";


function Scroll() {
  return (
    <> 
    <div className="Scroll">
    <div className='header'> 
    {/* <NavBar  user={user} setUser={setUser} /> */}
    </div> 
      <AddPost />
      <div>
        <Posts />
      </div>
      </div>
      <div> 
        <Footer />
      </div>
      </>
  )
}

export default Scroll;

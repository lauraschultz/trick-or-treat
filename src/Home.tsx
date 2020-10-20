import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-md p-2 z-10 leading-tight">
      <h2
        className="large-title"
      >
        I am:
      </h2>
      <div className="flex">
        <Link className="flex-initial text-center m-1 inline-block py-2 px-4 border-2 border-white rounded hover:bg-white hover:text-theme-dark" to="/requester">requesting candy</Link>
        <Link className="flex-initial text-center m-1 inline-block py-2 px-4 border-2 border-white rounded hover:bg-white hover:text-theme-dark" to="/sender">sending candy</Link>
      </div>
      
    </div>
  );
};

export default Home;

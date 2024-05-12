import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiNasa } from "react-icons/si";

export default function Header() {
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    navigate("/login");
  };

  return (
    <>
      <header className="absolute flex items-center justify-between px-5 w-full">
        <div className="flex items-center">
          <Link to="/">
            {/*Icon*/}
            <SiNasa className="text-6xl md:text-8xl text-white" />
          </Link>
        </div>

        <div className="flex items-center">
          {( !menuOpen) && (
            <nav className="hidden md:flex items-center space-x-4">
              <ul className="flex items-center space-x-4 text-white text-sm">
                <li>
                  <Link to="/apod">APOD</Link>
                </li>

                <li>
                  <Link to="/wildfire">WILDFIRE</Link>
                </li>

                <li>
                  <Link to="/epic">EPIC</Link>
                </li>

                <li>
                  <button
                    onClick={logout}
                    className="bg-transparent hover:bg-red-500 text-white font-semibold px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16.586L18.586 10L20 11.414L12 19.414L4 11.414L5.414 10L12 16.586ZM4 7.414L5.414 6L12 12.586L18.586 6L20 7.414L12 15.414L4 7.414Z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 6H21V8H3V6ZM3 12H21V14H3V12ZM3 18H21V20H3V18Z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {(menuOpen) && (
        <nav className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 rounded-md shadow-md w-full md:w-auto">
          <ul className="flex flex-col items-center justify-center space-y-4 text-white text-sm">
            <li>
              <Link to="/apod" onClick={() => setMenuOpen(false)}>
                APOD
              </Link>
            </li>

            <li>
              <Link to="/wildfire" onClick={() => setMenuOpen(false)}>
                WILDFIRE
              </Link>
            </li>

            <li>
              <Link to="/epic" onClick={() => setMenuOpen(false)}>
                EPIC
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="bg-transparent hover:bg-red-500 text-white font-semibold px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

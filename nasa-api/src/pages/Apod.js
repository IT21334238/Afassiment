import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components";

export default function Apod() {
  // State variables
  const [apod, setApod] = useState(null); // Holds the APOD data
  const [searchDate, setSearchDate] = useState(""); // Holds the date entered by the user for search
  const [loading, setLoading] = useState(true); // Indicates whether data is being loaded
  const articleRef = useRef(null); // Ref to the article element for image height adjustment

  // Function to get current date in the format YYYY-MM-DD
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Event handler for search date change
  function handleSearchDateChange(event) {
    setSearchDate(event.target.value);
  }

  // Function to fetch APOD data from NASA API
  async function fetchApod(date) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=0JkCDQPpYZrhuQe2Qg4THZfyIUbV293qlQn1uUdd`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch APOD data');
      }

      const data = await res.json();
      setApod(data);
    } catch (error) {
      console.error('Error fetching APOD data:', error);
      setApod(null);
      alert('Failed to fetch APOD data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  // Function to validate date format (YYYY-MM-DD)
  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  // Event handler for form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (isValidDate(searchDate)) {
      const currentDate = getCurrentDate();
      if (searchDate > currentDate) {
        alert("Please enter a date equal to or before the current date.");
      } else {
        fetchApod(searchDate);
      }
    } else {
      alert("Please enter a valid date in the format YYYY-MM-DD");
    }
  }

  // Effect hook to fetch APOD data on component mount
  useEffect(() => {
    fetchApod(getCurrentDate());
  }, []);

  // Effect hook to adjust image height when article height changes
  useEffect(() => {
    function updateImageHeight() {
      if (articleRef.current) {
        const articleHeight = articleRef.current.offsetHeight;
        const image = document.getElementById("apod-image");
        if (image) {
          image.style.height = `${articleHeight}px`;
        }
      }
    }
    updateImageHeight();
    window.addEventListener("resize", updateImageHeight);
    return () => {
      window.removeEventListener("resize", updateImageHeight);
    };
  }, [apod]);

  // Rendering
  return (
    <div className="container mx-auto px-4">
      {!loading ? (
        <>
          <section className="py-32 max-width flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
            <div>
              <h1 className="heading text-3xl lg:text-4xl mb-2">
                Astronomy Picture Of the Day
              </h1>
              <article ref={articleRef}>
                {apod ? (
                  <>
                    <h2 className="font-bold opacity-80 text-lg lg:text-2xl text-white mt-7">
                      {apod.title}
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-7">
                      <ul className="flex flex-col items-start justify-start gap-3 text-white opacity-75 text-sm">
                        <li>Date: {apod.date}</li>
                        <li>Copyright : {apod.copyright}</li>
                        <li>Service Version : {apod.service_version}</li>
                      </ul>
                    </div>

                    <p className="text-white opacity-75 mt-10">
                      {apod.explanation}
                    </p>

                    <ul className="flex items-center justify-start gap-3 mt-10">
                      <li>
                        <a
                          href={apod.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn"
                        >
                          Download Image
                        </a>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="text-white text-sm opacity-75 hover:opacity-100"
                        >
                          &larr; Back
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <p className="text-white opacity-75 mt-10">
                    Astronomy Picture of today is currently unavailable. Please check back later.
                  </p>
                )}
              </article>
            </div>

            <div className="flex flex-col">
              <form onSubmit={handleSubmit} className="mb-7 ml-10" data-testid="search-form">
                <label htmlFor="searchDate" className="text-white mb-2 mr-3">
                  Search APOD by Date:
                </label>
                <input
                  id="searchDate"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={searchDate}
                  onChange={handleSearchDateChange}
                  className="px-3 py-2 rounded-md border border-gray-300"
                  style={{ width: "200px" }}
                />
                <button type="submit" className="btn ml-2">
                  Search
                </button>
              </form>

              {apod && (
                <div className="border border-gray-400">
                  <img
                    src={apod.url}
                    alt={apod.title}
                    id="apod-image"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

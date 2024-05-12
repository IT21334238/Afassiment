import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Epic() {
  const [epicData, setEPICData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    fetchLatestEPICData();
  }, []);

  const fetchLatestEPICData = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural?api_key=kKSHGjiFgdVCGK3CcxyGLsxqKJnyGuIZaQAGpsnU`);
      if (response.data.length > 0) {
        const latestDate = response.data[0].date.slice(0, 10);
        setTodayDate(latestDate);
        fetchEPICData(latestDate);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching latest EPIC data:', error);
      setLoading(false);
    }
  };

  const fetchEPICData = async (date) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=0JkCDQPpYZrhuQe2Qg4THZfyIUbV293qlQn1uUdd`);
      setEPICData(response.data);
      setLoading(false);
      if (response.data.length > 0) {
        setSelectedImage(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching EPIC data:', error);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (isValidDate(todayDate)) {
      setLoading(true);
      fetchEPICData(todayDate);
    } else {
      alert("Please enter a valid date in the format YYYY-MM-DD");
    }
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const renderMainImage = () => {
    if (loading) {
      return (
        <div className="spinner" data-testid="loading-spinner">
          <article></article>
          <p className="text-white opacity-75 mt-5 text-xl font-bold">Loading . . .</p>
        </div>
      );
    } else if (selectedImage) {
      return (
        <div>
          <img
            src={`https://epic.gsfc.nasa.gov/archive/natural/${selectedImage.date.slice(0, 4)}/${selectedImage.date.slice(5, 7)}/${selectedImage.date.slice(8, 10)}/png/${selectedImage.image}.png`}
            alt={selectedImage.caption}
            className="mb-4 rounded-lg selected-image border border-white"
          />
          <div className="text-center mb-2">
            <h2 className="font-mono text-xl font-bold" >{selectedImage.caption}</h2>
            <p className="font-sans texttext-justify-center mt-7 text-gray-400" style={{ fontSize: '1.25rem' }}>{selectedImage.date}</p>
          </div>
        </div>
      );
    } else {
      return (
        <p className="text-white opacity-75 mt-10">
          Please select an image to display.
        </p>
      );
    }
  };

  const getTimeFromDate = (dateString) => {
    const date = new Date(dateString);
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString;
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="py-28 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-stone-900 to-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Earth Polychromatic Imaging Camera</h1>
      <form onSubmit={handleSearch} className="mb-7 mt-7">
        <label htmlFor="searchDate" className="text-white mb-2 mr-3">
          Search EPIC by Date:
        </label>
        <input
          id="searchDate"
          type="text"
          placeholder="YYYY-MM-DD"
          value={todayDate}
          onChange={(e) => setTodayDate(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 text-black"
          style={{ width: "200px" }}
        />
        <button type="submit" className="btn ml-2">
          Search
        </button>
      </form>
      <div className="max-w-screen-lg mt-2 w-2/6 mb-4">
        <Slider {...sliderSettings}>
          {epicData.map((image, index) => (
            <div key={index} title={getTimeFromDate(image.date)} className={selectedImage === image ? "selected-image-wrapper" : "image-wrapper"}>
              <img
                src={`https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(0, 4)}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/thumbs/${image.image}.jpg`}
                alt={image.caption}
                onClick={() => handleImageSelect(image)}
                className="miniature-image"
              />
              <p className="bg-black text-gray-400 text-center">{getTimeFromDate(image.date)}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="max-w-xs mb-20 md:max-w-6xl md:px-44">
        {renderMainImage()}
      </div>
      <div className="max-w-screen-lg text-white opacity-75 text-center">
        <p>
          The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope. Development of the EPIC API began in 2015, and is supported by the web development team for the Laboratory for Atmospheres in the Earth Sciences Division of the Goddard Space Flight Center.
        </p>
        <p>
          More information regarding the API and retrieval of the imagery for download can be found on the <a href="https://epic.gsfc.nasa.gov/" className="text-blue-400 hover:text-blue-600">EPIC website</a>.
        </p>
      </div>
    </div>
  );
}

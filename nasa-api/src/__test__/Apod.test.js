import axios from 'axios';
const FetchAPOD = require("./FetchAPOD");
import Apod from '../pages/Apod';
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";


jest.mock("axios");

const MockIOTD = () =>{
  return (
    <BrowserRouter>
      <Apod/>
    </BrowserRouter>
  )
}


describe("fetchAPOD", () => {




  it("fetches APOD data successfully", async () => {
    const responseData = {
      copyright: "Yuri Beletsky",
      date: "2024-05-04",
      explanation:
        "Despite their resemblance to R2D2, these three are not the droids you're looking for. Instead, the enclosures house 1.8 meter Auxiliary Telescopes (ATs) at Paranal Observatory in the Atacama Desert region of Chile. The ATs are designed to be used for interferometry, a technique for achieving extremely high resolution observations, in concert with the observatory's 8 meter Very Large Telescope units. A total of four ATs are operational, each fitted with a transporter that moves the telescope along a track allowing different arrays with the large unit telescopes. To work as an interferometer, the light from each telescope is brought to a common focal point by a system of mirrors in underground tunnels. Above these three ATs, the Large and Small Magellanic Clouds are the far, far away satellite galaxies of our own Milky Way. In the clear and otherwise dark southern skies, planet Earth's greenish atmospheric airglow stretches faintly along the horizon.",
      hdurl: "https://apod.nasa.gov/apod/image/2405/three_ats_beletsky.jpg",
      media_type: "image",
      service_version: "v1",
      title: "3 ATs",
      url: "https://apod.nasa.gov/apod/image/2405/three_ats_beletsky.jpg",
    };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const apodData = await FetchAPOD();

    expect(apodData).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.nasa.gov/planetary/apod?api_key=0JkCDQPpYZrhuQe2Qg4THZfyIUbV293qlQn1uUdd"
    );
  });




  
  it("throws an error when fetching fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    await expect(FetchAPOD()).rejects.toThrow("Failed to fetch APOD data");
  });
});


// apod.test.js


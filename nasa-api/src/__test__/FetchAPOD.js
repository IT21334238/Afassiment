// apod.js
const axios = require('axios');

const FetchAPOD = async () => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=0JkCDQPpYZrhuQe2Qg4THZfyIUbV293qlQn1uUdd');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch APOD data');
  }
};

module.exports = FetchAPOD;

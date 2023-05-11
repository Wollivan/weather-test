const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = 8080;
const app = express();
app.use(cors());

const data = require("./data/weather.json");

app.get("/", (request, response) => {
  response.status(200).json("You are looking at the root route.");
});

app.get("/weather", (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  const forecasts = [];
  try {
    const city = data.find((item) => {
      return item.city_name === searchQuery; // && item.lat === lat && item.lon === lon;
    });

    city.data.forEach((day) => {
      const fc = { date: day.valid_date, description: day.weather.description };
      forecasts.push(fc);
    });
  } catch (error) {
    console.log(error);
    response.status(404).json("Location not found");
  }

  response.status(200).json(forecasts);
});

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));

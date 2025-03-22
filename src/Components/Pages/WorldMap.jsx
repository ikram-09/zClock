import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const cityData = [
  // North America
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Toronto", lat: 43.65107, lng: -79.347015 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },

  // South America
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Lima", lat: -12.0464, lng: -77.0428 },
  { name: "Bogotá", lat: 4.711, lng: -74.0721 },
  { name: "Santiago", lat: -33.4489, lng: -70.6693 },

  // Europe
  { name: "London", lat: 51.5074, lng: 0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Moscow", lat: 55.7558, lng: 37.6173 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },

  // Asia
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
  { name: "Seoul", lat: 37.5665, lng: 126.978 },

  // Africa
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Nairobi", lat: -1.2864, lng: 36.8172 },
  { name: "Johannesburg", lat: -26.2041, lng: 28.0473 },
  { name: "Casablanca", lat: 33.5731, lng: -7.5898 },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241 },

  // Australia & Oceania
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane", lat: -27.4698, lng: 153.0251 },
  { name: "Auckland", lat: -36.8485, lng: 174.7633 },
  { name: "Wellington", lat: -41.2865, lng: 174.7762 },

  // Pakistan Cities
  { name: "Karachi", lat: 24.8607, lng: 67.0011 },
  { name: "Lahore", lat: 31.5497, lng: 74.3436 },
  { name: "Islamabad", lat: 33.6844, lng: 73.0479 },
  { name: "Rawalpindi", lat: 33.6844, lng: 73.0479 },
  { name: "Multan", lat: 30.1575, lng: 71.5249 },
  { name: "Peshawar", lat: 34.0151, lng: 71.5249 },
  { name: "Quetta", lat: 30.1798, lng: 66.975 },
];

const cityToCountry = {
  // Pakistan Cities
  Karachi: "Pakistan",
  Lahore: "Pakistan",
  Islamabad: "Pakistan",
  Rawalpindi: "Pakistan",
  Multan: "Pakistan",
  Peshawar: "Pakistan",
  Quetta: "Pakistan",

  // Other Cities
  "New York": "United States",
  "Los Angeles": "United States",
  Toronto: "Canada",
  "Mexico City": "Mexico",
  Chicago: "United States",
  Houston: "United States",
  "Buenos Aires": "Argentina",
  "Rio de Janeiro": "Brazil",
  "São Paulo": "Brazil",
  Lima: "Peru",
  Bogotá: "Colombia",
  Santiago: "Chile",
  London: "United Kingdom",
  Paris: "France",
  Berlin: "Germany",
  Moscow: "Russia",
  Madrid: "Spain",
  Rome: "Italy",
  Tokyo: "Japan",
  Beijing: "China",
  Shanghai: "China",
  Mumbai: "India",
  Bangkok: "Thailand",
  Seoul: "South Korea",
  Cairo: "Egypt",
  Lagos: "Nigeria",
  Nairobi: "Kenya",
  Johannesburg: "South Africa",
  Casablanca: "Morocco",
  "Cape Town": "South Africa",
  Sydney: "Australia",
  Melbourne: "Australia",
  Brisbane: "Australia",
  Auckland: "New Zealand",
  Wellington: "New Zealand",
};

const MapClickHandler = () => {
  const map = useMap();

  useEffect(() => {
    const onClick = () => {
      map.dragging.disable();
    };

    const onMoveEnd = () => {
      map.dragging.enable();
    };

    map.on("click", onClick);
    map.on("moveend", onMoveEnd);

    return () => {
      map.off("click", onClick);
      map.off("moveend", onMoveEnd);
    };
  }, [map]);

  return null;
};

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
  borderRadius: "10px",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const WorldMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityDetails, setCityDetails] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isValidTimezone = (timezone) => {
    try {
      new Date().toLocaleString("en-US", { timeZone: timezone });
      return true;
    } catch (e) {
      return false;
    }
  };

  const getTimeDifference = () => {
    if (!cityDetails || !cityDetails.timezone) return "Loading...";

    const timezone = isValidTimezone(cityDetails.timezone)
      ? cityDetails.timezone
      : "UTC";

    const cityTime = new Date(
      currentTime.toLocaleString("en-US", { timeZone: timezone })
    );
    const diff = cityTime.getTime() - currentTime.getTime();
    const diffMinutes = Math.round(diff / (1000 * 60));

    if (diffMinutes > 0) {
      return `+${diffMinutes} minutes ahead`;
    } else if (diffMinutes < 0) {
      return `${Math.abs(diffMinutes)} minutes behind`;
    } else {
      return "Same time";
    }
  };

  const handleCityClick = async (city) => {
    setSelectedCity(city);
    await fetchCityDetails(city);
  };

  const fetchCityDetails = async (city) => {
    setLoading(true);
    const countryName = cityToCountry[city.name];

    if (!countryName) {
      console.error(`No country found for city: ${city.name}`);
      setCityDetails(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          countryName
        )}?fullText=true`
      );

      if (response.data && response.data.length > 0) {
        const countryData = response.data[0];

        setCityDetails({
          continent: countryData.continents ? countryData.continents[0] : "N/A",
          area: countryData.area || "N/A",
          currencyCode: countryData.currencies
            ? Object.keys(countryData.currencies)[0]
            : "N/A",
          currencyName: countryData.currencies
            ? countryData.currencies[Object.keys(countryData.currencies)[0]]
                .name
            : "N/A",
          callingCode: countryData.idd
            ? `+${countryData.idd.root}${countryData.idd.suffixes[0]}`
            : "N/A",
          topLevelDomain: countryData.tld ? countryData.tld[0] : "N/A",
          latitude: city.lat,
          longitude: city.lng,
          population: countryData.population ? countryData.population : "N/A",
          timezone: countryData.timezones ? countryData.timezones[0] : null,
        });
      } else {
        setCityDetails(null);
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
      setCityDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event, value) => {
    setSearchCity(value);
    if (value) {
      const foundCity = cityData.find((city) => city.name === value.name);
      if (foundCity) {
        handleCityClick(foundCity);
      }
    }
  };

  return (
    <section>
      <div className="container">
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <StyledCardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Explore the World
                </Typography>
                <Autocomplete
                  id="city-search"
                  options={cityData}
                  getOptionLabel={(option) => option.name}
                  onChange={handleSearchChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for a City"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: <SearchIcon color="action" />,
                      }}
                    />
                  )}
                />
                <MapContainer
                  center={[0, 0]}
                  zoom={2}
                  style={{ height: "400px", width: "100%", marginTop: "20px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {cityData.map((city) => (
                    <Marker
                      key={city.name}
                      position={[city.lat, city.lng]}
                      eventHandlers={{
                        click: () => handleCityClick(city),
                      }}
                    >
                      <Popup>{city.name}</Popup>
                    </Marker>
                  ))}
                  <MapClickHandler />
                </MapContainer>
              </StyledCardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            {selectedCity && cityDetails && (
              <StyledCard>
                <StyledCardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {selectedCity.name} Details
                  </Typography>
                  {loading ? (
                    <Box display="flex" justifyContent="center">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <>
                      <StyledTypography variant="body2">
                        Time Difference: {getTimeDifference()}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Continent: {cityDetails.continent}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Area: {cityDetails.area} km²
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Currency: {cityDetails.currencyName} (
                        {cityDetails.currencyCode})
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Calling Code: {cityDetails.callingCode}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Internet Top Level Domain: {cityDetails.topLevelDomain}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Latitude: {cityDetails.latitude}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Longitude: {cityDetails.longitude}
                      </StyledTypography>
                      <StyledTypography variant="body2">
                        Population: {cityDetails.population}
                      </StyledTypography>
                    </>
                  )}
                </StyledCardContent>
              </StyledCard>
            )}
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default WorldMap;

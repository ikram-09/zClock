import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CitiesNames.css";

const cities = [
 "karachi", "Tokyo", "New York", "London", "Paris", "Sydney", "Rome", "Cairo", "Rio de Janeiro", "Moscow", "Beijing",
  "Toronto", "Berlin", "Madrid", "Istanbul", "Mexico City", "Seoul", "Mumbai", "Johannesburg", "Buenos Aires", "Singapore",
  "Bangkok", "Amsterdam", "Dubai", "Hong Kong", "Los Angeles", "Chicago", "Houston", "San Francisco", "Miami", "Dallas",
  "Philadelphia", "Atlanta", "Phoenix", "San Diego", "Seattle", "Denver", "Minneapolis", "Tampa", "Boston", "Baltimore",
  "Washington D.C.", "Las Vegas", "Portland", "St. Louis", "Detroit", "Orlando", "Charlotte", "Pittsburgh", "Cincinnati", "Sacramento",
  "San Antonio", "Salt Lake City", "Kansas City", "Milwaukee", "Cleveland", "Austin", "Columbus", "Indianapolis", "Nashville", "Oklahoma City",
  "Jacksonville", "New Orleans", "Richmond", "Memphis", "Louisville",
];

const City = ({ name, size, x, y, onClick }) => {
  return (
    <div
      className={`city size-${size}`}
      style={{
        left: `${x}vw`,
        top: `${y}vh`,
      }}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

const CitiesNames = () => {
  const [cityData, setCityData] = useState([]);
  const containerRef = useRef(null);
  const [positions, setPositions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const generateCityData = () => {
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const containerHeight = containerRef.current ? containerRef.current.offsetHeight : 0;
      const newPositions = {};

      const newData = cities.map((city, index) => {
        let x, y;
        let attempts = 0;
        let overlap = false;

        do {
          x = Math.random() * 90;
          y = Math.random() * 90;

          overlap = false;
          for (const existingCity in newPositions) {
            const existingPos = newPositions[existingCity];
            const distance = Math.sqrt(
              Math.pow(x - existingPos.x, 2) + Math.pow(y - existingPos.y, 2)
            );

            if (distance < 10) {
              overlap = true;
              break;
            }
          }
          attempts++;

          if (attempts > 1000) {
            console.warn("Could not find a non-overlapping position for", city);
            break;
          }
        } while (overlap);

        newPositions[city] = { x, y };
        return {
          id: index,
          name: city,
          size: Math.floor(Math.random() * 5) + 1,
          x: x,
          y: y,
        };
      });

      setPositions(newPositions);
      setCityData(newData);
    };

    generateCityData();
  }, []);

  const handleCityClick = (cityName) => {
    navigate(`/city/${cityName}`);
  };

  return (
    <div className="cities-container" ref={containerRef}>
      {cityData.map((city) => (
        <City
          key={city.id}
          name={city.name}
          size={city.size}
          x={city.x}
          y={city.y}
          onClick={() => handleCityClick(city.name)}
        />
      ))}
    </div>
  );
};

export default CitiesNames;

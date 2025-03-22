const cityData = [
  // North America
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Toronto', lat: 43.651070, lng: -79.347015 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698 },

  // South America
  { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Lima', lat: -12.0464, lng: -77.0428 },
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721 },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693 },

  // Europe
  { name: 'London', lat: 51.5074, lng: 0.1278 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },

  // Asia
  { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },

  // Africa
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Lagos', lat: 6.5244, lng: 3.3792 },
  { name: 'Nairobi', lat: -1.2864, lng: 36.8172 },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898 },
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241 },

  // Australia & Oceania
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane', lat: -27.4698, lng: 153.0251 },
  { name: 'Auckland', lat: -36.8485, lng: 174.7633 },
  { name: 'Wellington', lat: -41.2865, lng: 174.7762 },

  // Pakistan Cities
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', lat: 31.5497, lng: 74.3436 },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Rawalpindi', lat: 33.6844, lng: 73.0479 },
  { name: 'Multan', lat: 30.1575, lng: 71.5249 },
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
];

const cityToCountry = {
  // Pakistan Cities
  'Karachi': 'Pakistan',
  'Lahore': 'Pakistan',
  'Islamabad': 'Pakistan',
  'Rawalpindi': 'Pakistan',
  'Multan': 'Pakistan',
  'Peshawar': 'Pakistan',
  'Quetta': 'Pakistan',

  // Other Cities
  'New York': 'United States',
  'Los Angeles': 'United States',
  'Toronto': 'Canada',
  'Mexico City': 'Mexico',
  'Chicago': 'United States',
  'Houston': 'United States',
  'Buenos Aires': 'Argentina',
  'Rio de Janeiro': 'Brazil',
  'São Paulo': 'Brazil',
  'Lima': 'Peru',
  'Bogotá': 'Colombia',
  'Santiago': 'Chile',
  'London': 'United Kingdom',
  'Paris': 'France',
  'Berlin': 'Germany',
  'Moscow': 'Russia',
  'Madrid': 'Spain',
  'Rome': 'Italy',
  'Tokyo': 'Japan',
  'Beijing': 'China',
  'Shanghai': 'China',
  'Mumbai': 'India',
  'Bangkok': 'Thailand',
  'Seoul': 'South Korea',
  'Cairo': 'Egypt',
  'Lagos': 'Nigeria',
  'Nairobi': 'Kenya',
  'Johannesburg': 'South Africa',
  'Casablanca': 'Morocco',
  'Cape Town': 'South Africa',
  'Sydney': 'Australia',
  'Melbourne': 'Australia',
  'Brisbane': 'Australia',
  'Auckland': 'New Zealand',
  'Wellington': 'New Zealand',
};
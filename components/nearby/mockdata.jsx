// Mock data for nearby places when API is unavailable
export const mockPlacesData = {
  delhi: [
    {
      place_id: "mock_hospital_1",
      name: "Apollo Hospital - Indraprastha",
      address: "Sarita Vihar, Mathura Road, New Delhi, Delhi 110076",
      lat: 28.5355,
      lon: 77.2868,
      distance_m: 1200,
      phone: "+91 11 2692 5858",
      open_now: true,
      types: ["hospital"],
      map_url: "https://maps.google.com/?q=28.5355,77.2868",
      rating: 4.5,
      user_ratings_total: 5200,
      specialties: ["Cardiology", "Neurology", "Emergency Medicine"],
      topDoctors: [
        { name: "Dr. Rajesh Kumar", specialty: "Cardiology", qualification: "MD, FACC" },
        { name: "Dr. Priya Sharma", specialty: "Neurology", qualification: "MD, PhD" }
      ],
      beds_available: 45,
      blood_available: true,
      oxygen_available: true,
      services: ["Emergency Care", "ICU", "Surgery", "Blood Bank"]
    },
    {
      place_id: "mock_hospital_2",
      name: "Max Super Specialty Hospital",
      address: "Press Enclave Road, Saket, New Delhi, Delhi 110017",
      lat: 28.5244,
      lon: 77.2066,
      distance_m: 2500,
      phone: "+91 11 2651 5050",
      open_now: true,
      types: ["hospital"],
      map_url: "https://maps.google.com/?q=28.5244,77.2066",
      rating: 4.3,
      user_ratings_total: 3800,
      specialties: ["Orthopedics", "Pediatrics", "General Surgery"],
      topDoctors: [
        { name: "Dr. Amit Singh", specialty: "Orthopedics", qualification: "MD, FAAOS" }
      ],
      beds_available: 28,
      blood_available: true,
      oxygen_available: false,
      services: ["Surgery", "Pediatrics", "Radiology"]
    },
    {
      place_id: "mock_clinic_1",
      name: "Fortis Clinic - Greater Kailash",
      address: "M-1, Greater Kailash I, New Delhi, Delhi 110048",
      lat: 28.5494,
      lon: 77.2426,
      distance_m: 800,
      phone: "+91 11 4277 6222",
      open_now: true,
      types: ["clinic"],
      map_url: "https://maps.google.com/?q=28.5494,77.2426",
      rating: 4.6,
      user_ratings_total: 890,
      specialties: ["Family Medicine", "Internal Medicine"],
      doctors: [
        { name: "Dr. Neha Kapoor", specialty: "Family Medicine" }
      ],
      visitingHours: "Mon-Fri: 9:00 AM - 6:00 PM",
      services: ["General Consultation", "Health Checkups", "Vaccinations"]
    },
    {
      place_id: "mock_clinic_2",
      name: "Lajpat Nagar Multispecialty Clinic",
      address: "Central Market, Lajpat Nagar II, New Delhi, Delhi 110024",
      lat: 28.5677,
      lon: 77.2436,
      distance_m: 1500,
      phone: "+91 11 2984 5678",
      open_now: false,
      types: ["clinic"],
      map_url: "https://maps.google.com/?q=28.5677,77.2436",
      rating: 4.2,
      user_ratings_total: 420,
      specialties: ["Dermatology", "Gynecology"],
      doctors: [
        { name: "Dr. Sonia Mehta", specialty: "Dermatology" }
      ],
      visitingHours: "Mon-Sat: 10:00 AM - 7:00 PM",
      services: ["Skin Care", "Women's Health"]
    },
    {
      place_id: "mock_pharmacy_1",
      name: "Apollo Pharmacy - Nehru Place",
      address: "Nehru Place, New Delhi, Delhi 110019",
      lat: 28.5494,
      lon: 77.2501,
      distance_m: 600,
      phone: "+91 11 4166 9999",
      open_now: true,
      types: ["pharmacy"],
      map_url: "https://maps.google.com/?q=28.5494,77.2501",
      rating: 4.4,
      user_ratings_total: 650
    },
    {
      place_id: "mock_pharmacy_2",
      name: "MedPlus Pharmacy",
      address: "Defence Colony Market, New Delhi, Delhi 110024",
      lat: 28.5698,
      lon: 77.2327,
      distance_m: 1100,
      phone: "+91 11 4162 5500",
      open_now: true,
      types: ["pharmacy"],
      map_url: "https://maps.google.com/?q=28.5698,77.2327",
      rating: 4.1,
      user_ratings_total: 320
    }
  ],
  mumbai: [
    {
      place_id: "mock_hospital_3",
      name: "Lilavati Hospital and Research Centre",
      address: "A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050",
      lat: 19.0596,
      lon: 72.8295,
      distance_m: 1500,
      phone: "+91 22 2640 0000",
      open_now: true,
      types: ["hospital"],
      map_url: "https://maps.google.com/?q=19.0596,72.8295",
      rating: 4.7,
      user_ratings_total: 6200,
      specialties: ["Cardiology", "Oncology", "Emergency Medicine"],
      topDoctors: [
        { name: "Dr. Sunil Desai", specialty: "Cardiology", qualification: "MD, FACC" }
      ],
      beds_available: 52,
      blood_available: true,
      oxygen_available: true,
      services: ["Emergency Care", "Cancer Treatment", "Surgery"]
    },
    {
      place_id: "mock_pharmacy_3",
      name: "1mg Pharmacy - Andheri",
      address: "Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053",
      lat: 19.1368,
      lon: 72.8340,
      distance_m: 900,
      phone: "+91 22 6789 1234",
      open_now: true,
      types: ["pharmacy"],
      map_url: "https://maps.google.com/?q=19.1368,72.8340",
      rating: 4.3,
      user_ratings_total: 540
    }
  ],
  bengaluru: [
    {
      place_id: "mock_hospital_4",
      name: "Manipal Hospital - Whitefield",
      address: "#143, 212-2015, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066",
      lat: 12.9698,
      lon: 77.7499,
      distance_m: 2000,
      phone: "+91 80 2569 0000",
      open_now: true,
      types: ["hospital"],
      map_url: "https://maps.google.com/?q=12.9698,77.7499",
      rating: 4.5,
      user_ratings_total: 4100,
      specialties: ["Neurology", "Orthopedics", "Pediatrics"],
      topDoctors: [
        { name: "Dr. Arvind Reddy", specialty: "Neurology", qualification: "MD, PhD" }
      ],
      beds_available: 38,
      blood_available: true,
      oxygen_available: true,
      services: ["Neurology", "Orthopedics", "ICU"]
    },
    {
      place_id: "mock_clinic_3",
      name: "HealthCare Clinic - Koramangala",
      address: "80 Feet Road, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
      lat: 12.9352,
      lon: 77.6245,
      distance_m: 1200,
      phone: "+91 80 4112 3456",
      open_now: true,
      types: ["clinic"],
      map_url: "https://maps.google.com/?q=12.9352,77.6245",
      rating: 4.4,
      user_ratings_total: 780,
      specialties: ["Pediatrics", "Family Medicine"],
      doctors: [
        { name: "Dr. Lakshmi Iyer", specialty: "Pediatrics" }
      ],
      visitingHours: "Mon-Sat: 9:00 AM - 8:00 PM",
      services: ["Child Health", "Vaccinations", "General Care"]
    }
  ]
};

// Get mock data based on coordinates (closest city)
export const getMockDataForLocation = (lat, lon) => {
  const cities = {
    delhi: { lat: 28.6139, lon: 77.2090 },
    mumbai: { lat: 19.0760, lon: 72.8777 },
    bengaluru: { lat: 12.9716, lon: 77.5946 }
  };

  // Find closest city
  let closestCity = 'delhi';
  let minDistance = Infinity;

  Object.entries(cities).forEach(([city, coords]) => {
    const distance = Math.sqrt(
      Math.pow(lat - coords.lat, 2) + Math.pow(lon - coords.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });

  return mockPlacesData[closestCity] || mockPlacesData.delhi;
};
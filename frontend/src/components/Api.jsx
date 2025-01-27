import React from 'react'

export const Api = () => {

  let api = [
    {
      flights: [
        {
          flight_id: "AF123",
          airline: "Air France",
          departure: {
            airport: "CDG",
            city: "Paris",
            time: "2025-01-27T15:30:00Z",
          },
          arrival: {
            airport: "JFK",
            city: "New York",
            time: "2025-01-27T18:45:00Z",
          },
          aircraft: {
            model: "Airbus A380",
            registration: "F-HPJB",
            age: 12,
          },
          status: "Scheduled",
        },
        {
          flight_id: "DL456",
          airline: "Delta",
          departure: {
            airport: "ATL",
            city: "Atlanta",
            time: "2025-01-27T12:00:00Z",
          },
          arrival: {
            airport: "LAX",
            city: "Los Angeles",
            time: "2025-01-27T14:30:00Z",
          },
          aircraft: {
            model: "Boeing 737",
            registration: "N123DL",
            age: 8,
          },
          status: "En Route",
        },
      ],
    },
  ]; 

  return (
    <div>Api</div>
  )
}

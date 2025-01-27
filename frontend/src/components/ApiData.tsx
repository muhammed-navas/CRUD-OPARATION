import React from "react";

export const ApiData: React.FC = () => {
 
  interface ApiType {
    flights: {
      flight_id: string;
      airline: string;
      departure: {
        airport: string;
        city: string;
        time: string;
      };
      arrival: {
        airport: string;
        city: string;
        time: string;
      };
      aircraft: {
        model: string;
        registration: string;
        age: number;
      };
      status: string;
    }[];
  }

  
  const api: ApiType = {
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
  };

  return (
    <div>
      <div>
        {api?.flights?.map((item : any,i)=>{
          let arrival = item?.arrival;
          console.log(arrival)
          return (
            <>
              <div>
                arrival --
                <h4>AirPort : arrival.airport</h4>
                <h4>city : arrival.city</h4>
                <h4>time : arrival.time</h4>
              </div>
              <div key={i}> hi </div>
            </>
          );
        }
        )}
      </div>
    </div>
  );
};

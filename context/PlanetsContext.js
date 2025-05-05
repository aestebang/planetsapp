import React, { createContext, useContext, useState, useEffect } from "react";
import useGetAllPlanet from "../hooks/useGetAllPlanet";
import usePlanetImages from "../hooks/usePlanetImages";

const PlanetsContext = createContext();

export function PlanetsProvider({ children }) {
  const { planets } = useGetAllPlanet();
  const [planetsData, setPlanetsData] = useState(null);
  const images = usePlanetImages(planets?.bodies || []);

  useEffect(() => {
    if (planets?.bodies) {
      setPlanetsData({
        bodies: planets.bodies,
        images: images,
      });
    }
  }, [planets, images]);

  return (
    <PlanetsContext.Provider value={{ planetsData }}>
      {children}
    </PlanetsContext.Provider>
  );
}

export function usePlanets() {
  const context = useContext(PlanetsContext);
  if (!context) {
    throw new Error("usePlanets must be used within a PlanetsProvider");
  }
  return context;
}

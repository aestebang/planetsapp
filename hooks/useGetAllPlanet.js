import React, { useEffect, useState } from "react";
import getAllPlanet from "../services/getAllPlanet.service";

const useGetAllPlanet = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getAllPlanet()
      .then((data) => {
        setPlanets(data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  return {
    planets,
  };
};

export default useGetAllPlanet;

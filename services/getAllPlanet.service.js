import React from "react";
const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

const getAllPlanet = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export default getAllPlanet;

import React from "react";
const IMAGE_URL = process.env.EXPO_PUBLIC_GET_IMAGE_URL;
const getImage = async (planet) => {
  try {
    //console.log(`${IMAGE_URL}${planet}_(planet)`);
    const response = await fetch(`${IMAGE_URL}${planet}_(planet)`);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export default getImage;

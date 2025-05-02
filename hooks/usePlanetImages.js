import { useEffect, useState } from "react";
import getImage from "../services/getImage.service";

export default function usePlanetImages(planets) {
  const [images, setImages] = useState({});

  useEffect(() => {
    if (!planets || !planets.length) return;

    const fetchImages = async () => {
      const imageMap = {};

      await Promise.all(
        planets.map(async (planet) => {
          try {
            const data = await getImage(planet.englishName);
            // //console.log('image data', data);
            imageMap[planet.englishName] = data.thumbnail?.source || null;
          } catch (error) {
            imageMap[planet.englishName] = null;
          }
        })
      );

      setImages(imageMap);
    };

    fetchImages();
  }, [planets]);

  return images;
}

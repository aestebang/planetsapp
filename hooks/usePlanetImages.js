import { useEffect, useState } from "react";
import getImage from "../services/getImage.service";

/**
 * Hook personalizado para obtener imágenes de planetas
 * @param {Array} planets - Array de objetos planeta
 * @returns {Object} Objeto con las URLs de las imágenes de los planetas
 */
export default function usePlanetImages(planets) {
  // Estado para almacenar las imágenes de los planetas
  const [images, setImages] = useState({});

  useEffect(() => {
    // Si no hay planetas, no hacemos nada
    if (!planets || !planets.length) return;

    /**
     * Función asíncrona para obtener las imágenes de todos los planetas
     */
    const fetchImages = async () => {
      // Objeto temporal para almacenar las imágenes
      const imageMap = {};

      // Realizamos todas las peticiones de imágenes en paralelo
      await Promise.all(
        planets.map(async (planet) => {
          try {
            // Intentamos obtener la imagen para cada planeta
            const data = await getImage(planet.englishName);
            // Guardamos la URL de la miniatura o null si no existe
            imageMap[planet.englishName] = data.thumbnail?.source || null;
          } catch (error) {
            // Si hay un error, guardamos null para ese planeta
            imageMap[planet.englishName] = null;
          }
        })
      );

      // Actualizamos el estado con todas las imágenes obtenidas
      setImages(imageMap);
    };

    // Ejecutamos la función de obtención de imágenes
    fetchImages();
  }, [planets]); // El efecto se ejecuta cuando cambia la lista de planetas

  // Devolvemos el objeto con las imágenes
  return images;
}

# PlanetsApp

**PlanetsApp** es una aplicación móvil desarrollada con **React Native** y **Expo** que permite a los usuarios explorar información sobre diferentes planetas y marcar sus favoritos. La aplicación utiliza `AsyncStorage` para almacenar los planetas favoritos localmente.

## Características

- Visualización de planetas con detalles como temperatura, gravedad, densidad, radio, masa y órbita sideral.
- Posibilidad de marcar planetas como favoritos.
- Navegación entre pestañas para ver todos los planetas y solo los favoritos.
- Animaciones atractivas usando Lottie.

## Funcionalidades Principales

### Exploración de Planetas

- Lista completa de planetas del sistema solar
- Vista detallada de cada planeta con información científica
- Imágenes de alta calidad de cada planeta
- Datos actualizados en tiempo real desde la API

### Sistema de Favoritos

- Guardado local de planetas favoritos
- Sincronización automática de favoritos
- Filtrado rápido entre todos los planetas y favoritos
- Persistencia de datos entre sesiones

### Interfaz de Usuario

- Diseño intuitivo y responsive
- Navegación fluida entre pantallas
- Animaciones suaves para mejor experiencia de usuario
- Modo oscuro/claro para mejor visualización

## Cómo Funciona

### Flujo de Datos

1. La aplicación inicia cargando los datos de los planetas desde la API
2. Los datos se almacenan en el estado local de la aplicación
3. Las imágenes se cargan de forma asíncrona desde Wikipedia
4. Los favoritos se sincronizan con AsyncStorage

### Gestión de Favoritos

1. El usuario puede marcar/desmarcar planetas como favoritos
2. Los cambios se guardan automáticamente en AsyncStorage
3. La lista de favoritos se actualiza en tiempo real
4. Los datos persisten entre sesiones de la aplicación

### Optimización de Rendimiento

- Carga lazy de imágenes
- Caché de datos de planetas
- Gestión eficiente del estado
- Actualizaciones optimizadas de la interfaz

## Decisiones Técnicas

### Framework y Plataforma

- **React Native + Expo:** Se eligió esta combinación por:
  - Desarrollo multiplataforma eficiente (iOS y Android con un solo código base)
  - Facilidad de desarrollo y depuración con Expo
  - Gran ecosistema de componentes y bibliotecas
  - Hot Reload para desarrollo rápido

### Almacenamiento Local

- **AsyncStorage:** Seleccionado por:
  - Solución ligera y eficiente para datos simples
  - API asíncrona que no bloquea el hilo principal
  - Persistencia de datos entre sesiones
  - Compatibilidad nativa con React Native

### Animaciones

- **Lottie:** Implementado por:
  - Animaciones de alta calidad con archivos JSON ligeros
  - Rendimiento optimizado
  - Gran cantidad de recursos disponibles
  - Facilidad de integración con Expo

### APIs Externas

- **Le Système Solaire API:** Elegida por:

  - Datos científicos precisos y actualizados
  - API gratuita y sin necesidad de autenticación
  - Endpoints bien documentados
  - Formato JSON estructurado

- **Wikipedia REST API:** Complementa con imágenes porque:
  - Fuente confiable de imágenes de planetas
  - Alta disponibilidad y velocidad
  - Sin límites de uso restrictivos
  - Formato de respuesta consistente

## APIs utilizadas

- **Datos de los planetas:** [le-systeme-solaire.net](https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true)
- **Imágenes de los planetas:** [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/page/summary/)

> La API de los planetas no proporciona imágenes, por lo que se utiliza la API de Wikipedia para obtenerlas.

## Instalación

Para ejecutar este proyecto localmente, sigue los siguientes pasos:

```bash
npm install       # Instala las dependencias
npm start         # Inicia la aplicación con Expo
```

> Asegúrate de tener instalado Expo CLI (`npm install -g expo-cli`).

## Implementación Técnica

### Custom Hooks

#### useGetAllPlanet

```javascript
const useGetAllPlanet = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    getAllPlanet()
      .then((data) => setPlanets(data))
      .catch((error) => console.error(error));
  }, []);
  return { planets };
};
```

Hook personalizado que maneja la obtención de datos de planetas desde la API. Utiliza `useState` y `useEffect` para gestionar el estado y las peticiones.

#### usePlanetImages

```javascript
const usePlanetImages = (planets) => {
  const [images, setImages] = useState({});
  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};
      await Promise.all(
        planets.map(async (planet) => {
          try {
            const data = await getImage(planet.englishName);
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
};
```

Hook que gestiona la obtención de imágenes de planetas desde la API de Wikipedia. Realiza peticiones en paralelo para optimizar el rendimiento.

#### useFavorites

```javascript
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };

  const toggleFavorite = async (planetId) => {
    try {
      const newFavorites = favorites.includes(planetId)
        ? favorites.filter((id) => id !== planetId)
        : [...favorites, planetId];
      setFavorites(newFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error al guardar favorito:", error);
    }
  };

  return { favorites, toggleFavorite, isFavorite, loadFavorites };
};
```

Hook que maneja la funcionalidad de favoritos utilizando AsyncStorage para persistencia local.

### Servicios

#### getAllPlanet.service.js

```javascript
const getAllPlanet = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
```

Servicio que realiza la petición a la API de planetas para obtener todos los datos.

#### getImage.service.js

```javascript
const getImage = async (planet) => {
  try {
    const response = await fetch(`${IMAGE_URL}${planet}_(planet)`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
```

Servicio que obtiene las imágenes de los planetas desde la API de Wikipedia.

### Componentes Principales

#### CardPlanet

Componente principal que muestra la cuadrícula de planetas con las siguientes funcionalidades:

- Búsqueda de planetas
- Ordenamiento A-Z/Z-A
- Filtrado por favoritos
- Animaciones de transición
- Gestión de estado con Context API

#### ItemPlanet

Componente que renderiza cada tarjeta de planeta individual con:

- Imagen del planeta
- Información básica (nombre, tipo, temperatura, gravedad)
- Botón de favorito
- Navegación al detalle del planeta

#### PlanetDetails

Componente que muestra la información detallada de un planeta:

- Imagen de alta resolución
- Datos científicos completos
- Información de descubrimiento
- Datos orbitales

### Context API

#### PlanetsContext

```javascript
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
```

Contexto global que maneja el estado de los planetas y sus imágenes, proporcionando acceso a estos datos en toda la aplicación.

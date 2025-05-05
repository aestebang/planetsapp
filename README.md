# PlanetsApp

**PlanetsApp** es una aplicación móvil desarrollada con **React Native** y **Expo** que permite a los usuarios explorar información sobre diferentes planetas y marcar sus favoritos. La aplicación utiliza `AsyncStorage` para almacenar los planetas favoritos localmente.

## Características

- Visualización de planetas con detalles como temperatura, gravedad, densidad, radio, masa y órbita sideral.
- Posibilidad de marcar planetas como favoritos.
- Navegación entre pestañas para ver todos los planetas y solo los favoritos.
- Animaciones atractivas usando Lottie.

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

<h1>Movie-App</h1> 📽️

### Comenzamos

Para poder comenzar tenemos que instalar las dependencias que utilizaremos.

```javascript
npm install
```

Dentro de nuestra carpeta `components` tendremos subcarpetas con nuestros nuestro archivo.js y .css para tener mas acomodado nuestro codigo.
En la carpeta `components` tenemos 4 subcarpetas: `Buscador`. `Favorites`, `Movie`, `NavBar`. Y en cada una crearemos sus respectivos archivos .js y .css.
`NavBar.js` sera nuestro Header que nos permitira navegar por nuestras rutas.
`Buscador.js` sera nuestro Home, en donde buscaremos peliculas (llamando a la API) y las mostraremos en forma de lista.
En `Favorites.js` mostraremos la lista de peliculas a las cuales seleccionamos como Favoritas.
Y por ultimo en `Movie.js` sera nuestro compente en donde mostraremos una pelicula en detalle. Accedemos a este componente haciendo click dentro de nuestro buscador o en nuestras favoritas.

### Creamos nuestras Actions

En nuestro archivo `index.js` en nuestra carpeta actions. Por ahora vamos a crear 4 actions. Una para hacer la request a la API y traer todas las peliculas `getMovies`,otra para traer los detalles de la pelicula especifica `getMovieDetail`, a otra para agregarlas como Favoritas `addMovieFavorite` y otra para eliminarla de favoritas `removeMovieFavorite`.

> Abajo tienes un par de ejemplos, para las dos que faltan tienes que investigar y hacerlo por tu propia cuenta. La api que usamos es `http://www.omdbapi.com/`

> Para obtener alguna película a partir de su ID pueden usar el endpoint: http://www.omdbapi.com/?apikey=20dac387&i={idMovie}

```javascript
export function addMovieFavorite(payload) {
  return { type: "ADD_MOVIE_FAVORITE", payload };
}

export function getMovies(titulo) {
  return function(dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "GET_MOVIES", payload: json });
      });
  };
}

```

### Creamos nuestro Reducer

Vamos al archivo `index.js` en nuestra carpeta reducers. Como vimos, un reducer es simplemente una funcion que recibe 2 parametros: state y action. Y depende la `action` que reciba nos devuelve el estado actualizado. Al comienzo del archivo creamos nuestro estado inicial. Lo llamamos `initialState`:

```javascript
const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: {}
};
```

Tienes que crear los 4 reducers para las 4 acciones que creamos anteriormente que son:`getMovies`, `getMovieDetail`, `removeMovieFavorite`,`addMovieFavorite`

> Aca abajo le dejamos dos ejemplos, vas a tener que crear los dos restantes

```javascript
function rootReducer(state = initialState, action) {
  if (action.type === "ADD_MOVIE_FAVORITE") {
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.concat(action.payload)
      }
  }
  if (action.type === "GET_MOVIES") {
      return {
        ...state,
        moviesLoaded: action.payload.Search
      };
  }
  return state;
}

export default rootReducer;
```

Ya tenemos la base de nuestro reducer. Como sabemos el `initialState` es inmutable, por eso a la hora del return, hacemos una copia de este, con sintaxis de ES6 (spread operator) otra opcion seria usar `Object.assign({}, state, ...)`, y nos devuelve nuestro `state` actualizado. Exportamos el reducer para poder usarlo en nuestro store. Para entenderlo mejor pueden leer [aca](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns).



### Armamos nuestro store

Ahora pasamos a crear nuestro Store Global que tendra todo nuestro State. Vamos a nuestro archivo `index.js` en nuestra carpeta store, tenemos que importar `CreateStore` de 'redux', por ahora nos deberia quedar asi:

```javascript
import { createStore } from "redux";

const store = createStore();

export default store;
```
La funciton `createStore` recibe argumentos. Primero le pasaremos nuestro `rootReducer` y despues nuestro Middleware para poder hacer peticiones asincronas en nuestro codigo.

### Conectamos el Store con nuestro rootReducer y Middleware

Ya tenemos nuestro Reducer y nuestras actions. Entonces terminamos de conectar nuestro store, para esto importamos `applyMiddleware` de 'redux', `thunk` de la libreria 'redux-thunk' y nuestro Reducer. Pasamos como parametros en `createStore` nuestro rootReducer y applyMiddleware, a esta le pasamos nuestro middleware `thunk`.
Puedes investigar sobre `thunk` en  [aca](https://github.com/reduxjs/redux-thunk).
Usamos un Middleware para poder hacer peticiones AJAX sin problemas. Nos quedaria algo asi:

```javascript
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```









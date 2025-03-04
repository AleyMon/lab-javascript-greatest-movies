// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

import { movies } from './data.js'; // se importa el array

/* EJERCICIO 1:
Relación entre getAllDirectors y map():
getAllDirectors es una función que toma un array (moviesArray) como argumento.
Dentro de getAllDirectors, map() es el método que transforma ese array, generando un nuevo array que contiene solo los directores.
El método map() recorre cada película (movie) en el array moviesArray y extrae la propiedad director de cada objeto.
Entonces, las dos funciones están conectadas, porque getAllDirectors usa map() para realizar la tarea de extraer los directores del array de películas.

Lo que ocurre aquí es que map() actúa como una función dentro de otra función. Es decir, getAllDirectors es la función principal y map() es la función que ayuda a realizar el trabajo específico dentro de esa función.
*/

//Primero declaras la función 
function getAllDirectors(moviesArray) {
    if (moviesArray.length === 0) {  // comprobamos que array no esta vacio
      return []; // si esta vacio, retorna array vacio, evitando errores de sistema
    }

    //el metodo map transforma el array de la funcion anterior,recorriendo cada elemento (representado x movie) y extrayendo la propiedad .director de cada objeto
    const directors = moviesArray.map(movie => movie.director);
    return directors;  // Devuelve el resultado con array que contiene solo directores para que se pueda usar en el futuro.
  }
  
  /*Después, puedes llamar a la función con el array movies. Como no necesitamos reutilizar el dato en otro lugar del codigo, podemos vincular el 
  resultado a la misma variable del map* (ya que map crear una lista nueva con los datos que selecionamos)*/

  const directors = getAllDirectors(movies);
  
  console.log(directors);  // Para ver los directores en la consola.


// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;  // Devuelve 0 si el array está vacío
      }
    
      // Filtramos las películas dirigidas por Steven Spielberg y que sean del género Drama
      const stevenSpielbergDramaMovies = moviesArray.filter(function(movie) {
        return movie.director === 'Steven Spielberg' && movie.genre.includes('Drama');
    });
    
      // Si no hay películas de Steven Spielberg de género Drama, devolvemos 0
      if (stevenSpielbergDramaMovies.length === 0) {
        return 0;
      }
  // Si hay exactamente 2 películas de Spielberg de género Drama, devolvemos 2
  else if (stevenSpielbergDramaMovies.length === 2) {
    return 2;
  }

  // Si hay exactamente 4 películas de Spielberg de género Drama, devolvemos 4
  else if (stevenSpielbergDramaMovies.length === 4) {
    return 4;
  }

  // En caso de que haya más de 4, devolvemos el número exacto de películas
  else {
    return stevenSpielbergDramaMovies.length;
  }
    }
/*Llamamos a la función y almacenamos el resultado en una variable. En howManyMovies(), no estamos creando un array nuevo, 
sino contando cuántas películas cumplen con un criterio, por lo que el resultado es un número que debe almacenarse en una variable por separado.*/
const stevenSpielbergDramaMoviesCount = howManyMovies(movies);

// Mostramos el resultado en la consola
console.log(stevenSpielbergDramaMoviesCount);





// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0){
        return 0;
    }
    // Filtramos las películas con puntuación (score) 8
    const moviesWithScore8 = moviesArray.filter(movie => movie.score === 8);

    // Si no hay películas con puntuación 8, devolvemos 0
    if (moviesWithScore8.length === 0) {
        return 0;
    }

    // Sumar los puntajes de las películas que tienen score 8
    const totalScore = moviesWithScore8.reduce((acumulador, movie) => {
        // Verificamos que la película tenga score (en caso de que alguna película no tenga puntuación)
        if (movie.score !== undefined) {
            return acumulador + movie.score;
        }
        return acumulador;
    }, 0);

    // Calculamos el promedio de los puntajes y lo redondeamos a 2 decimales
    const average = totalScore / moviesWithScore8.length;
    return Math.round(average * 100) / 100; // Redondeamos a dos decimales
}
const averageScore = scoresAverage(movies);
console.log(averageScore); 


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {

        // Si el array está vacío, devolvemos 0
        if (moviesArray.length === 0) {
            return 0;
        }
    
        /* Si el array tiene solo un elemento, devolvemos su puntuación si es de género Drama
         Usamos [0] cuando solo nos interesa el primer elemento del array (como en el caso del if con una sola película). 
         en este caso nos interesa revisar el primer elemento del array, y como consta de objetos debemos
         acceder por el indice (el array no tiene propiedades directas, las propiedad pertenecen al objeto, por
         lo que nos movemos por indices*/
        if (moviesArray.length === 1 && moviesArray[0].genre.includes('Drama')) {
            return moviesArray[0].score; // Si hay solo una película y es de genero Drama, devuelve la propiedad score del primer objeto [0] en el array (moviesArray).
        }
    
        // Filtramos las películas con el género 'Drama'
        const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));
    
        // Si no hay películas dramáticas, devolvemos 0
        if (dramaMovies.length === 0) {
            return 0;
        }
    
        // Sumamos las puntuaciones de las películas dramáticas
        const totalScore = dramaMovies.reduce((acumulador, movie) => acumulador + movie.score, 0);
    
        // Calculamos el promedio y lo devolvemos redondeado a dos decimales
        const average = totalScore / dramaMovies.length;
        return Math.round(average * 100) / 100;  // Redondeamos a dos decimales
}

const dramaAverageScore = scoresAverage(movies);
console.log(dramaAverageScore); 


// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    if (moviesArray.length === 0) {
        return [];
    }

    if (moviesArray.length === 1 ) {
        return moviesArray[0]; // sacamos todos los datos de la pelicula (si quiseramos sacar solo alguna propiedad ejemplo año, seria return moviesArray[0].year)
    }
// Primero, creamos una copia del array para no mutar el original
const moviesCopy = [...moviesArray];

// Ordenamos por año primero, y si hay empate, por título alfabéticamente
const sortedMovies = moviesCopy.sort((a, b) => {
    // Si el año es igual, ordena alfabéticamente por el título
    if (a.year === b.year) {
        return a.title.localeCompare(b.title);  // Compara los títulos alfabéticamente
    }
    // De lo contrario, ordena por año
    return a.year - b.year;
});

// Retorna el array ordenado
return sortedMovies;
}

const sortedMoviesList = scoresAverage(movies);
console.log(sortedMoviesList);


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {

  if (moviesArray.length === 0) {
    return [];
}

return moviesArray
  .sort((a, b) => a.title.localeCompare(b.title))  // Ordena alfabéticamente
  .slice(0, 20)  // Limita a los primeros 20 si hay más de 20
  .map(movie => movie.title);  // Extrae solo los títulos
}

// Llamar a la función y guardar el resultado en una variable
const sortedMoviesAlph = orderAlphabetically(movies);

// Imprimir el resultado en la consola
console.log(sortedMoviesAlph);




// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // Verificamos si el array está vacío, en cuyo caso simplemente devolvemos un array vacío
  if (moviesArray.length === 0) {
    return [];
  }

  // Creamos un nuevo array para almacenar los resultados
  return moviesArray.map(movie => {
    // Usamos una expresión regular para encontrar horas y minutos en el formato "Xh Ym"
    let duration = movie.duration;
    let hours = 0;
    let minutes = 0;

    // Verificamos si el formato es "Xh Ym" o solo "Ym"
    if (duration.includes("h") && duration.includes("m")) {
      // Si tiene tanto horas como minutos
      hours = parseInt(duration.split("h")[0]);
      minutes = parseInt(duration.split("h")[1].split("m")[0]);
    } else if (duration.includes("h")) {
      // Si solo tiene horas
      hours = parseInt(duration.split("h")[0]);
    } else if (duration.includes("m")) {
      // Si solo tiene minutos
      minutes = parseInt(duration.split("m")[0]);
    }

    // Convertimos las horas a minutos y sumamos los minutos
    let totalMinutes = (hours * 60) + minutes;

    // Retornamos un nuevo objeto con el título y la duración en minutos
    return {
      title: movie.title,
      duration: totalMinutes
    };
  });
}

const moviesArray = [
  { title: "Movie 1", duration: "2h 30m" },
  { title: "Movie 2", duration: "1h 45m" },
  { title: "Movie 3", duration: "341m" }
];

console.log(turnHoursToMinutes(movies));




// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  // Si el array está vacío, retornamos null
  if (moviesArray.length === 0) {
    return null;
  }

  // Creamos un objeto para almacenar las sumas y las cantidades de películas por año
  const yearStats = {};

  // Recorremos el array de películas para llenar el objeto yearStats
  for (const movie of moviesArray) {
    const year = movie.year;
    const score = movie.score;

    // Si ya existe el año en el objeto, sumamos el score y aumentamos el contador
    if (yearStats[year]) {
      yearStats[year].sum += score;
      yearStats[year].count += 1;
    } else {
      // Si el año no existe, inicializamos las sumas y el contador
      yearStats[year] = {
        sum: score,
        count: 1
      };
    }
  }

  // Inicializamos variables para encontrar el año con el mejor promedio
  let bestYear = null;
  let highestAvg = -Infinity;

  // Recorremos el objeto yearStats para calcular el promedio y encontrar el mejor año
  for (const year in yearStats) {
    const avg = yearStats[year].sum / yearStats[year].count;
    
    // Si encontramos un promedio más alto o un empate con un año más antiguo
    if (avg > highestAvg || (avg === highestAvg && year < bestYear)) {
      highestAvg = avg;
      bestYear = year;
    }
  }

  return bestYear;
}



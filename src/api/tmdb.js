import axios from "axios"

const API_KEY = "9919aac47cec3e307e57789106fe5797"

const BASE_URL = "https://api.themoviedb.org/3"



 export const fetchTrendingMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  )

  return response.data.results

}



export const fetchTopRatedMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  )

  return response.data.results
}



export const fetchUpcomingMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
  )

  const today = new Date()

  const filteredMovies = response.data.results.filter((movie) => {

    return new Date(movie.release_date) > today

  })

  return filteredMovies

}



export const fetchPopularMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  return response.data.results
}



export const fetchActionMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
  )

  return response.data.results
}



export const fetchHorrorMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
  )

  return response.data.results
}



export const fetchRomanceMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
  )

  return response.data.results
}



export const fetchComedyMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
  )

  return response.data.results
}

/* INDIAN MOVIES */
export const fetchIndianMovies = async () => {

  const languages = ["hi", "te", "ta", "ml", "kn"]

  let allMovies = []

  for (const lang of languages) {

    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&sort_by=popularity.desc`
    )

    allMovies = [...allMovies, ...response.data.results]

  }

  return allMovies

}


/* KOREAN MOVIES */
export const fetchKoreanMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`
  )

  return response.data.results

}


/* JAPANESE MOVIES */
export const fetchJapaneseMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&sort_by=popularity.desc`
  )

  return response.data.results

}


/* ANIME MOVIES */
export const fetchAnimeMovies = async () => {

  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=210024&sort_by=popularity.desc`
  )

  return response.data.results

}

/* SEARCH MOVIES */
export const searchMovies = async (query) => {

  if (!query) return []

  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  )

  return response.data.results

}

/* FEATURED HERO MOVIE */
export const fetchFeaturedMovie = async () => {

  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  )

  const movies = response.data.results.filter(
    (movie) => movie.backdrop_path
  )

  const randomMovie =
    movies[Math.floor(Math.random() * movies.length)]

  return randomMovie

}

/* FETCH MOVIE TRAILER */
export const fetchMovieTrailer = async (movieId) => {

  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  )

  const trailer = response.data.results.find(
    (video) =>
      video.type === "Trailer" &&
      video.site === "YouTube"
  )

  return trailer

}
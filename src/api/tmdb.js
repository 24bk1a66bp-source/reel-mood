import axios from "axios"

const API_KEY = "9919aac47cec3e307e57789106fe5797"

const BASE_URL = "https://api.themoviedb.org/3"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

async function getData(url) {
  try {

    const response = await api.get(
      `${url}${url.includes("?") ? "&" : "?"}api_key=${API_KEY}`
    )

    return response.data

  } catch (err) {

    console.log("TMDB ERROR:", err)

    return { results: [] }

  }
}


/* HOME */

export const fetchTrendingMovies = async () => {
  const data = await getData("/movie/now_playing")
  return data.results
}

export const fetchTopRatedMovies = async () => {
  const data = await getData("/movie/top_rated")
  return data.results
}

export const fetchPopularMovies = async () => {
  const data = await getData("/movie/popular")
  return data.results
}

export const fetchUpcomingMovies = async () => {
  const data = await getData("/movie/upcoming")
  return data.results
}


/* GENRES */

export const fetchActionMovies = async () => {
  const data =
    await getData("/discover/movie?with_genres=28")

  return data.results
}

export const fetchComedyMovies = async () => {
  const data =
    await getData("/discover/movie?with_genres=35")

  return data.results
}

export const fetchRomanceMovies = async () => {
  const data =
    await getData("/discover/movie?with_genres=10749")

  return data.results
}

export const fetchHorrorMovies = async () => {
  const data =
    await getData("/discover/movie?with_genres=27")

  return data.results
}



/* LANGUAGE */

export const fetchIndianMovies = async()=>{

let all=[]

const langs=[
"hi",
"te",
"ta",
"ml",
"kn"
]

for(const lang of langs){

const data=
await getData(
`/discover/movie?with_original_language=${lang}&sort_by=popularity.desc`
)

all=[
...all,
...data.results
]

}

return all

}



export const fetchKoreanMovies=async()=>{

const data=
await getData(
"/discover/movie?with_original_language=ko"
)

return data.results

}


export const fetchJapaneseMovies=async()=>{

const data=
await getData(
"/discover/movie?with_original_language=ja"
)

return data.results

}



export const fetchAnimeMovies=async()=>{

const data=
await getData(
"/discover/movie?with_keywords=210024"
)

return data.results

}



/* SEARCH */

export const searchMovies=async(query)=>{

if(!query)
return []

const data=
await getData(
`/search/movie?query=${query}`
)

return data.results

}



/* FEATURED */

export const fetchFeaturedMovie=async()=>{

const data=
await getData(
"/movie/popular"
)

const movies=
data.results.filter(
movie=>movie.backdrop_path
)

return movies[
Math.floor(
Math.random()*movies.length
)
]

}



/* DETAILS */

export const fetchMovieDetails=async(id)=>{

try{

const response=
await api.get(
`/movie/${id}?api_key=${API_KEY}`
)

return response.data

}catch{

return null

}

}

/* TRAILER */

export const fetchMovieTrailer = async (movieId) => {

try{

const response =
await api.get(
`/movie/${movieId}/videos?api_key=${API_KEY}`
)

const trailer =
response.data.results.find(

video =>

video.type==="Trailer" &&
video.site==="YouTube"

)

return trailer

}catch{

return null

}

}
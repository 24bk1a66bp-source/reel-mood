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

let movies = []
let series = []

for (let page = 1; page <= 2; page++) {

const movieData =
await getData(
`/trending/movie/week?page=${page}`
)

const tvData =
await getData(
`/trending/tv/week?page=${page}`
)

movies = [
...movies,
...(movieData.results || []).map(item => ({
...item,
media_type: "movie"
}))
]

series = [
...series,
...(tvData.results || []).map(item => ({
...item,
media_type: "tv"
}))
]

}

const combined = [
...movies,
...series
]

return combined
.filter(item => item && item.poster_path)
.sort(() => Math.random() - 0.5)

}

export const fetchTopRatedMovies = async () => {

const data = await getData(
"/movie/top_rated?page=1"
)

return (data.results || [])
.filter(movie => movie.poster_path)
.slice(0, 12)

}


export const fetchPopularMovies = async () => {

const data = await getData(
`/movie/popular?page=${Math.floor(Math.random() * 5) + 1}`
)

return (data.results || [])
.filter(movie => movie.poster_path)
.slice(0, 12)

}

export const fetchPopularSeries = async () => {
  const data = await getData("/tv/popular")
  return data.results
}

export const fetchUpcomingMovies = async () => {

const upcoming1 = await getData(
"/movie/upcoming?page=1"
)

const upcoming2 = await getData(
"/movie/upcoming?page=2"
)

const popular = await getData(
"/movie/popular?page=1"
)

 

const all = [

...(upcoming1.results || []),
...(upcoming2.results || []),
...(popular.results || []),
 

]

const unique = []

const ids = new Set()

for (const movie of all) {

if (
movie.poster_path &&
!ids.has(movie.id)
) {

ids.add(movie.id)

unique.push(movie)

}

}

for (let i = unique.length - 1; i > 0; i--) {

const j = Math.floor(Math.random() * (i + 1))

;[unique[i], unique[j]] =
[unique[j], unique[i]]

}

return unique.slice(0, 12)

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

export const fetchIndianMovies = async () => {

const langs = ["hi", "te", "ta"]

let all = []

for (const lang of langs) {

const data = await getData(
`/discover/movie?with_original_language=${lang}&sort_by=popularity.desc&page=1`
)

all = [
...all,
...(data.results || [])
]

}

return all
.filter(movie => movie.poster_path)
.slice(0, 12)

}



 export const fetchKoreanMovies = async () => {

const data = await getData(
"/discover/movie?with_original_language=ko&page=1"
)

return (data.results || [])
.filter(movie => movie.poster_path)
.slice(0, 12)

}

 export const fetchJapaneseMovies = async () => {

const movieData = await getData(
"/discover/movie?with_original_language=ja&page=1"
)

const tvData = await getData(
"/discover/tv?with_original_language=ja&page=1"
)

const all = [

...(movieData.results || []),
...(tvData.results || [])

]

 const today = new Date()

const filtered = all.filter(item => {

const releaseDate = new Date(
item.release_date || item.first_air_date
)

return (
item.poster_path &&
releaseDate > today
)

})

const shuffled = filtered.sort(
() => 0.5 - Math.random()
)

return shuffled.slice(0, 12)

}



export const fetchAnimeMovies = async () => {

const movieData = await getData(
"/discover/movie?with_genres=16&page=1"
)

const tvData = await getData(
"/discover/tv?with_genres=16&page=1"
)

const all = [

...(movieData.results || []),
...(tvData.results || [])

]

return all
.filter(item => item.poster_path)
.sort((a, b) => b.popularity - a.popularity)
.slice(0, 12)

}


/* SEARCH */

export const searchMovies = async (query) => {

try {

const movieResponse = await axios.get(

`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

)

const tvResponse = await axios.get(

`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`

)

const upcomingResponse = await axios.get(

`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`

)

const manualUpcoming = [

{
id: 999001,
title: "Dragon",
poster_path: "/9o0U5Lnq3Cz2K4Pjrr9xKx5jQxM.jpg",
release_date: "2026-01-09",
media_type: "movie"
},

{
id: 999002,
title: "Spirit",
poster_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
release_date: "2026-01-01",
media_type: "movie"
},

{
id: 999003,
title: "Peddi",
poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
release_date: "2026-03-27",
media_type: "movie"
},

{
id: 999004,
title: "Varanasi",
poster_path: "/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
release_date: "2026-01-01",
media_type: "movie"
}

]

const combinedResults = [

...(movieResponse.data.results || []),

...(tvResponse.data.results || []),

...(upcomingResponse.data.results || []),

...manualUpcoming

]

const filteredResults = combinedResults.filter(

(item) => {

const title =
(item.title || item.name || "")
.toLowerCase()

return title.includes(query.toLowerCase())

}

)

filteredResults.sort((a, b) => {

const aTitle =
(a.title || a.name || "")
.toLowerCase()

const bTitle =
(b.title || b.name || "")
.toLowerCase()

const queryLower =
query.toLowerCase()

if (aTitle === queryLower) return -1
if (bTitle === queryLower) return 1

if (aTitle.startsWith(queryLower)) return -1
if (bTitle.startsWith(queryLower)) return 1

return 0

})

return filteredResults

}

catch (error) {

console.log("SEARCH ERROR:", error)

return []

}

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

export const fetchOnlyMovies = async () => {

const data =
await getData(
"/trending/movie/week"
)

return (data.results || []).filter(
movie => movie.poster_path
)

}
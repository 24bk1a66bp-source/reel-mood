import IntroAnimation from "./components/IntroAnimation"
import Navbar from "./components/Navbar"
import { Volume2, VolumeX } from "lucide-react"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Languages from "./pages/Languages"
import ScrollRestoration from "./components/ScrollRestoration"
import LanguageMovies from "./pages/LanguageMovies"
import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

 import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchPopularMovies,
  fetchIndianMovies,
  fetchKoreanMovies,
  fetchJapaneseMovies,
  fetchAnimeMovies,
  searchMovies,
  fetchFeaturedMovie,
  fetchMovieTrailer,
} from "./api/tmdb"

import MovieDetails from "./pages/MovieDetails"
import GenreMovies from "./pages/GenreMovies"
import Genres from "./pages/Genres"
import MoodMovies from "./pages/MoodMovies"
import Moods from "./pages/Moods"
import MovieCard from "./components/MovieCard"

function HomePage() {

  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [popular, setPopular] = useState([])
  const [indianMovies, setIndianMovies] = useState([])
  const [koreanMovies, setKoreanMovies] = useState([])
  const [japaneseMovies, setJapaneseMovies] = useState([])
  const [animeMovies, setAnimeMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [featuredTrailer, setFeaturedTrailer] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const titleRef = useRef()
  const subRef = useRef()
  const buttonsRef = useRef()
  const navRef = useRef()
  const moviesRef = useRef()

  useEffect(() => {

  const fetchSearch = async () => {

    if (search.trim() === "") {

      setSearchResults([])

      return

    }

    const data = await searchMovies(search)

    setSearchResults(data)

  }

  fetchSearch()

}, [search])

  useEffect(() => {

    gsap.killTweensOf("*")

    const loadMovies = async () => {
  try {

    const [
  trendingData,
  topRatedData,
  upcomingData,
  popularData,
  indianData,
  koreanData,
  japaneseData,
  animeData,
  featuredData
] = await Promise.all([
  fetchTrendingMovies(),
  fetchTopRatedMovies(),
  fetchUpcomingMovies(),
  fetchPopularMovies(),
  fetchIndianMovies(),
  fetchKoreanMovies(),
  fetchJapaneseMovies(),
  fetchAnimeMovies(),
  fetchFeaturedMovie()
])

let trailerData = null

 

    const removeDuplicates = (movies) => {

  const ids = new Set()

  return (movies || []).filter((movie) => {

    if (
      ids.has(movie.id) ||
      !movie.poster_path
    ) return false

    ids.add(movie.id)

    return true

  })

}
    const mixedMovies = [

...trendingData,
...topRatedData,
...upcomingData,
...popularData,
...indianData,
...koreanData,
...japaneseData,
...animeData

]

const uniqueMixed = removeDuplicates(mixedMovies)

const shuffled = uniqueMixed.sort(
() => 0.5 - Math.random()
)

if (shuffled[0]?.id) {

  trailerData = await fetchMovieTrailer(
    shuffled[0].id
  )

}

setTrending(shuffled)
    setTopRated(removeDuplicates(topRatedData))
    setUpcoming(removeDuplicates(upcomingData))
    setPopular(removeDuplicates(popularData))
    setIndianMovies(removeDuplicates(indianData))
    setKoreanMovies(removeDuplicates(koreanData))
    setJapaneseMovies(removeDuplicates(japaneseData))
    setAnimeMovies(removeDuplicates(animeData))

    setFeaturedMovie(shuffled[0])
    setFeaturedTrailer(trailerData)

  } catch (err) {
    console.error("Movie loading failed:", err)
  }
}
    

    loadMovies()

    const tl = gsap.timeline()

    tl.from(navRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })

    tl.from(titleRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power4.out",
    })

    tl.from(subRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")

    tl.from(buttonsRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")

  }, [])

  useEffect(() => {

  if (trending.length === 0) return

  const interval = setInterval(() => {

    setFeaturedIndex((prev) => {

      const nextIndex =
        prev === trending.length - 1
          ? 0
          : prev + 1

      const nextMovie = trending[nextIndex]

      setFeaturedMovie(nextMovie)

      fetchMovieTrailer(nextMovie.id)
        .then((data) => {
          setFeaturedTrailer(data)
        })

      return nextIndex

    })

  }, 30000)

  return () => clearInterval(interval)

}, [trending])
  


  const scrollToMovies = () => {

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
    })

  }


  const MovieRow = ({ title, movies }) => (

  <section className="mb-28">

    <h2 className="text-5xl font-bold mb-10">
      {title}
    </h2>

    <div className="flex gap-7 overflow-x-auto no-scrollbar pb-2">

      {movies
        .filter((movie) =>
          (movie.title || movie.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
        )
        .map((movie) => (

          <MovieCard
            key={movie.id}
            movie={movie}
          />

        ))}

    </div>

  </section>

)


  return (

    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] md:min-h-screen overflow-hidden">

        {/* BACKGROUND */}
         {featuredTrailer ? (

  <iframe
   className="absolute inset-0 w-full h-full scale-125 pointer-events-none opacity-100"
  src={`https://www.youtube.com/embed/${featuredTrailer.key}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&loop=1&playlist=${featuredTrailer.key}`}
  title="Trailer"
  allow="autoplay"
  frameBorder="0"
/>

) : (

  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: featuredMovie
        ? `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`
        : "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop')",
    }}
  />

)}

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black/20" />

        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-red-700/20 blur-[180px]" />


        {/* CONTENT */}
        <div className="relative z-20">

           {menuOpen && (
           <div className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center py-8 gap-6">

    <Link to="/" onClick={() => setMenuOpen(false)}>
      Home
    </Link>

    <Link to="/movies" onClick={() => setMenuOpen(false)}>
     Movies
    </Link>

     <Link to="/series" onClick={() => setMenuOpen(false)}>
     Series
    </Link>

    <Link to="/moods" onClick={() => setMenuOpen(false)}>
      Moods
    </Link>

  </div>
)}


          {/* HERO */}
          <div className="min-h-[75vh] md:min-h-screen flex items-center px-4 md:px-20 pt-12 md:pt-20 pb-10">

            <div className="max-w-4xl">

              <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-6">
                CINEMATIC MOOD EXPERIENCE
              </p>

              <h1
                ref={titleRef}
                className="
                 text-3xl
                 sm:text-5xl
                 md:text-[9rem]
                 leading-[0.9]
                 drop-shadow-2xl
                 line-clamp-2
                 max-w-[95%]
                 "
                style={{ fontFamily: "Anton" }}
              >
                 {featuredMovie?.title || featuredMovie?.name || "WATCH"}
                </h1>

              <p
                ref={subRef}
                className="
                mt-5
                text-gray-200
                text-sm
                md:text-xl
               leading-relaxed
               max-w-2xl
               line-clamp-4
               md:line-clamp-none
               "
                >
  {featuredMovie?.overview ||
    "Discover movies tailored to your emotions."}
</p>

<div className="flex items-center gap-6 mt-8 text-lg text-gray-300">

  <p>
    ⭐ {featuredMovie?.vote_average?.toFixed(1)}
  </p>

  <p>
    {featuredMovie?.release_date}
  </p>

</div>

              {/* BUTTONS */}
               <div
  ref={buttonsRef}
  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10"
>

   <Link
  to={`/${featuredMovie?.media_type || "movie"}/${featuredMovie?.id}`}
  state={{ from: "/" }}
>

  <button 
className="
px-7 py-3
bg-white
text-black
rounded-full
font-medium
text-sm
transition duration-300
hover:bg-red-500
hover:text-white
"
>

View Details




  </button>

</Link>

  <Link to="/moods">

    <button className="
px-7 py-3
bg-white/5
backdrop-blur-xl
border border-white/10
text-white
rounded-full
font-medium
text-sm
transition duration-300
hover:bg-white/10
"
>
      Choose Mood

    </button>

  </Link>

  <button
  onClick={() => setIsMuted(!isMuted)}
  className="
w-10 h-10
rounded-full
bg-black/40
backdrop-blur-xl
border border-white/10
flex items-center justify-center
text-white
transition duration-300
hover:bg-white/10
"
>

  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}

</button>

</div>
            </div>

          </div>

        </div>

      </section>


      {/* MOVIES SECTION */}
      <section
        ref={moviesRef}
        className="relative z-30 bg-black px-8 md:px-16 py-24"
      >


        <MovieRow
          title="Trending"
          movies={trending}
        />

        <MovieRow
          title="Top Rated"
          movies={topRated}
        />

        <MovieRow
          title="Upcoming"
          movies={upcoming}
        />

        <MovieRow
          title="Popular"
          movies={popular}
        />

        <MovieRow
  title="Indian Cinema"
  movies={indianMovies}
/>

<MovieRow
  title="Korean Hits"
  movies={koreanMovies}
/>

<MovieRow
  title="Japanese Cinema"
  movies={japaneseMovies}
/>

<MovieRow
  title="Anime World"
  movies={animeMovies}
/>

      </section>

    </div>

  )

}


function App() {

  const [showIntro, setShowIntro] = useState(true)

useEffect(() => {

const timer = setTimeout(() => {

setShowIntro(false)

}, 4000)

return () => clearTimeout(timer)

}, [])

  return (

    <>

      <ScrollRestoration />

      {showIntro && <IntroAnimation />}

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/languages" element={<Languages />} />

        <Route
          path="/language/:languageName"
          element={<LanguageMovies />}
        />

        <Route path="/genres" element={<Genres />} />

        <Route
          path="/genre/:genreName"
          element={<GenreMovies />}
        />

        <Route
           path="/movies"
           element={<Movies />}
        />

        <Route
  path="/series"
  element={<Series />}
/>

        <Route path="/moods" element={<Moods />} />

        <Route
          path="/mood/:moodName"
          element={<MoodMovies />}
        />

         <Route
  path="/:type/:id"
  element={<MovieDetails />}
/>

      </Routes>

    </>

  )

}

export default App
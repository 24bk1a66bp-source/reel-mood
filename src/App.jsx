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

      const trendingData = await fetchTrendingMovies()

const topRatedData = await fetchTopRatedMovies()

const upcomingData = await fetchUpcomingMovies()

const popularData = await fetchPopularMovies()

const indianData = await fetchIndianMovies()

const koreanData = await fetchKoreanMovies()

const japaneseData = await fetchJapaneseMovies()

const animeData = await fetchAnimeMovies()
const featuredData = await fetchFeaturedMovie()
const trailerData = await fetchMovieTrailer(featuredData.id)

      const usedIds = new Set()

const removeDuplicates = (movies) => {

  return movies.filter((movie) => {

    if (
      usedIds.has(movie.id) ||
      !movie.poster_path
    ) {
      return false
    }

    usedIds.add(movie.id)

    return true

  })

}

setTrending(removeDuplicates(trendingData))

setTopRated(removeDuplicates(topRatedData))

setUpcoming(removeDuplicates(upcomingData))

setPopular(removeDuplicates(popularData))

setIndianMovies(removeDuplicates(indianData))

setKoreanMovies(removeDuplicates(koreanData))

setJapaneseMovies(removeDuplicates(japaneseData))

setAnimeMovies(removeDuplicates(animeData))
setFeaturedMovie(featuredData)
setFeaturedTrailer(trailerData)

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
          movie.title
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

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND */}
         {featuredTrailer ? (

  <iframe
  key={isMuted}
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

          {/* NAVBAR */}
          <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-black/30 backdrop-blur-md border-b border-white/10"
          >

            <h1 className="text-2xl md:text-3xl tracking-[0.35em] text-white font-semibold">
              REELMOOD
            </h1>

            <div className="flex items-center gap-10 text-sm md:text-base text-gray-200">

              <Link to="/">
                <button className="hover:text-red-400 transition duration-300">
                  Home
                </button>
              </Link>

              <Link to="/genres">
                <button className="hover:text-red-400 transition duration-300">
                  Genres
                </button>
              </Link>

              <Link to="/languages">

  <button className="hover:text-red-400 transition duration-300">
    Languages
  </button>

</Link>

              <Link to="/moods">
                <button className="hover:text-red-400 transition duration-300">
                  Moods
                </button>
              </Link>

            </div>

          </nav>


          {/* HERO */}
          <div className="min-h-screen flex items-center px-8 md:px-20 pt-24">

            <div className="max-w-4xl">

              <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-6">
                CINEMATIC MOOD EXPERIENCE
              </p>

              <h1
                ref={titleRef}
                className="text-6xl sm:text-7xl md:text-[9rem] leading-[0.9] drop-shadow-2xl"
                style={{ fontFamily: "Anton" }}
              >
                {featuredMovie?.title || "WATCH"}
                </h1>

              <p
  ref={subRef}
  className="mt-8 text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl"
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
  className="flex flex-wrap items-center gap-5 mt-12"
>

   <Link
  to={`/movie/${featuredMovie?.id}`}
  state={{ from: "/" }}
>

  <button className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition duration-300 hover:scale-105 shadow-2xl">

    View Details

  </button>

</Link>


  <button
    onClick={scrollToMovies}
    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white hover:text-black transition duration-300 hover:scale-105"
  >

    Browse Movies

  </button>


  <Link to="/moods">

    <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white hover:text-black transition duration-300 hover:scale-105">

      Choose Mood

    </button>

  </Link>

  <button
  onClick={() => setIsMuted(!isMuted)}
  className="
    w-14 h-14
    rounded-full
    border border-white/20
    bg-white/10 backdrop-blur-md
    flex items-center justify-center
    hover:bg-red-500
    transition duration-300
  "
>

  {isMuted ? "🔇" : "🔊"}

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

        {/* SEARCH */}
        <div className="mb-20 relative">

          <input

          
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[550px] px-7 py-5 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-full text-white outline-none text-lg shadow-2xl focus:border-red-500 transition duration-300"
          />
          {search.trim() !== "" && (

  <div className="mt-6 bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 max-w-3xl">

    {searchResults.length > 0 ? (

   searchResults.slice(0, 8).map((movie) => (

  <Link
    to={`/movie/${movie.id}`}
    key={movie.id}
    className="flex items-center gap-5 p-4 hover:bg-white/5 transition duration-300 border-b border-white/5"
  >

    <img
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt={movie.title}
      className="w-16 h-24 object-cover rounded-xl"
    />

    <div>

      <h3 className="text-xl font-semibold text-white">
        {movie.title}
      </h3>

      <p className="text-gray-400 mt-1">
        {movie.release_date?.slice(0, 4)}
      </p>

      <p className="text-red-400 mt-1">
        ⭐ {movie.vote_average?.toFixed(1)}
      </p>

    </div>

  </Link>

))

) : (

  <div className="p-8 text-center text-gray-400">

    No movies found.

  </div>

)}

</div>

)}

        </div>


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

  return (

    <>

      <ScrollRestoration />

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

        <Route path="/moods" element={<Moods />} />

        <Route
          path="/mood/:moodName"
          element={<MoodMovies />}
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

      </Routes>

    </>

  )

}

export default App
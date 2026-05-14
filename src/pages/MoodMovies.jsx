import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useParams, Link, useLocation } from "react-router-dom"

const moodMap = {

  Dark: "53,80",
  Romantic: "10749,18",
  Horror: "27",
  Funny: "35",
  Emotional: "18,10749",
  Epic: "12,14",
  Action: "28",
  Fantasy: "14",
  "Mind Blowing": "878,9648",

}

const moodStyles = {

  Dark: "from-black via-zinc-900 to-red-950",
  Romantic: "from-pink-950 via-rose-900 to-black",
  Horror: "from-black via-red-950 to-black",
  Funny: "from-yellow-700 via-orange-600 to-black",
  Emotional: "from-blue-900 via-indigo-900 to-black",
  Epic: "from-orange-900 via-red-900 to-black",
  Action: "from-zinc-900 via-red-900 to-black",
  Fantasy: "from-indigo-900 via-purple-900 to-black",
  "Mind Blowing": "from-cyan-900 via-blue-900 to-black",

}

function MoodMovies() {

  const { moodName } = useParams()

  const location = useLocation()

  const [movies, setMovies] = useState([])

  const [page, setPage] = useState(() => {

    const savedPage = sessionStorage.getItem(
      `page-${window.location.pathname}`
    )

    return savedPage
      ? parseInt(savedPage)
      : 1

  })

  const [loading, setLoading] = useState(false)

  const [restored, setRestored] = useState(false)

  const [showTopButton, setShowTopButton] = useState(false)

  const bgStyle =
    moodStyles[moodName] ||
    "from-black via-zinc-900 to-black"


  /* RESET WHEN MOOD CHANGES */
  useEffect(() => {

    setMovies([])

    const savedPage = sessionStorage.getItem(
      `page-${window.location.pathname}`
    )

    setPage(
      savedPage
        ? parseInt(savedPage)
        : 1
    )

    setRestored(false)

  }, [moodName])


  useEffect(() => {

  const handleTopButton = () => {

    if (window.scrollY > 800) {

      setShowTopButton(true)

    } else {

      setShowTopButton(false)

    }

  }

  window.addEventListener("scroll", handleTopButton)

  return () =>
    window.removeEventListener("scroll", handleTopButton)

}, [])


  /* FETCH MOVIES */
  useEffect(() => {

    const fetchMoodMovies = async () => {

      setLoading(true)

      const genreIds = moodMap[moodName]

      let allMovies = []

      for (let i = 1; i <= page; i++) {

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genreIds}&page=${i}`
        )

        const data = await res.json()

        allMovies = [

          ...allMovies,

          ...(data.results || []).filter(
            (movie) => movie.poster_path
          ),

        ]

      }

      const uniqueMovies = allMovies.filter(
        (movie, index, self) =>
          index ===
          self.findIndex(
            (m) => m.id === movie.id
          )
      )

      setMovies(uniqueMovies)

      setLoading(false)

    }

    fetchMoodMovies()

  }, [moodName, page])


  /* RESTORE SCROLL */
  useEffect(() => {

    if (movies.length > 0 && !restored) {

      const savedScroll =
        sessionStorage.getItem(location.pathname)

      if (savedScroll) {

        setTimeout(() => {

          window.scrollTo({
            top: parseInt(savedScroll),
            behavior: "instant",
          })

        }, 1200)

      }

      setRestored(true)

    }

  }, [movies, restored, location.pathname])


  /* SAVE SCROLL */
  useEffect(() => {

    const saveScroll = () => {

      sessionStorage.setItem(
        location.pathname,
        window.scrollY
      )

    }

    window.addEventListener("scroll", saveScroll)

    return () =>
      window.removeEventListener("scroll", saveScroll)

  }, [location.pathname])


  /* INFINITE SCROLL */
  useEffect(() => {

    const handleScroll = () => {

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
        !loading
      ) {

        setPage((prev) => {

          const nextPage = prev + 1

          sessionStorage.setItem(
            `page-${location.pathname}`,
            nextPage
          )

          return nextPage

        })

      }

    }

    window.addEventListener("scroll", handleScroll)

    return () =>
      window.removeEventListener("scroll", handleScroll)

  }, [loading, location.pathname])


  return (

    <div className={`min-h-screen text-white bg-gradient-to-br ${bgStyle}`}>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 md:px-16 py-8 border-b border-white/10">

        <Link to="/">

          <h1 className="text-2xl md:text-3xl tracking-[0.35em] font-semibold">
            REELMOOD
          </h1>

        </Link>

        <Link to="/moods">

          <button className="px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition duration-300">
            Back
          </button>

        </Link>

      </nav>


      {/* HEADER */}
      <div className="px-8 md:px-16 pt-16 pb-10">

        <h1
          className="text-6xl md:text-8xl font-black mb-6"
          style={{ fontFamily: "Anton" }}
        >
          {moodName}
        </h1>

        <p className="text-xl text-gray-300">
          Movies curated for your current vibe.
        </p>

      </div>


      {/* MOVIES */}
      <div className="px-8 md:px-16 pb-24">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {movies.map((movie, index) => (

            <Link
              to={`/movie/${movie.id}`}
              state={{ from: `/mood/${moodName}` }}
              key={`${movie.id}-${index}`}
              className="group cursor-pointer"
              onClick={() => {

                sessionStorage.setItem(
                  location.pathname,
                  window.scrollY
                )

              }}
            >

              <div className="overflow-hidden rounded-3xl shadow-2xl">

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <h2 className="mt-4 text-lg font-semibold line-clamp-2">
                {movie.title}
              </h2>

              <p className="text-red-300 text-sm mt-1">
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>

            </Link>

          ))}

        </div>

        {/* SCROLL TO TOP BUTTON */}
{showTopButton && (

  <button
    onClick={() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

    }}
    className="
      fixed bottom-8 right-8
      w-14 h-14
      rounded-full
      bg-red-500 hover:bg-red-600
      flex items-center justify-center
      shadow-2xl
      z-50
      transition duration-300
      hover:scale-110
    "
  >

    <ChevronUp size={30} />

  </button>

)}


        {/* LOADING */}
        {loading && (

          <div className="text-center py-16 text-gray-400 text-xl">

            Loading more movies...

          </div>

        )}

      </div>

    </div>

  )

}

export default MoodMovies
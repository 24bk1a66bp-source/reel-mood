import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useParams, Link, useLocation } from "react-router-dom"

const languageMap = {
  Telugu: "te",
  Tamil: "ta",
  Hindi: "hi",
  Malayalam: "ml",
  Kannada: "kn",
  English: "en",
  Korean: "ko",
  Japanese: "ja",
  French: "fr",
  Spanish: "es",
  Anime: "ja",
}

function LanguageMovies() {

  const { languageName } = useParams()

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


  /* RESET WHEN LANGUAGE CHANGES */
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

  }, [languageName])

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

    const fetchLanguageMovies = async () => {

      setLoading(true)

      const languageCode = languageMap[languageName]

      let allMovies = []

      for (let i = 1; i <= page; i++) {

        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=9919aac47cec3e307e57789106fe5797&with_original_language=${languageCode}&sort_by=popularity.desc&page=${i}`
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

    fetchLanguageMovies()

  }, [languageName, page])


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

    <div className="bg-black text-white min-h-screen px-8 md:px-16 py-12">

      {/* TOP */}
      <div className="flex items-center justify-between mb-14">

        <div>

          <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-4">
            Explore Language
          </p>

          <h1
            className="text-6xl md:text-[7rem] leading-none"
            style={{ fontFamily: "Anton" }}
          >
            {languageName}
          </h1>

        </div>

        <Link to="/languages">

          <button className="px-7 py-3 bg-white text-black rounded-full font-semibold">
            Back
          </button>

        </Link>

      </div>


      {/* MOVIES */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

        {movies.map((movie, index) => (

          <Link
            to={`/movie/${movie.id}`}
            state={{ from: `/language/${languageName}` }}
            key={`${movie.id}-${index}`}
            className="group cursor-pointer"
            onClick={() => {

              sessionStorage.setItem(
                location.pathname,
                window.scrollY
              )

            }}
          >

            <div className="overflow-hidden rounded-[2rem]">

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
              />

            </div>

            <h2 className="mt-4 text-xl font-bold line-clamp-2 leading-tight">
              {movie.title}
            </h2>

            <p className="text-red-400 mt-2">
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
    

  )

}

export default LanguageMovies
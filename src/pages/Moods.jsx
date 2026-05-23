import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronUp } from "lucide-react"

function Moods() {

  const [movies, setMovies] = useState([])

  const [loading, setLoading] =
  useState(false)

  const [page, setPage] =
  useState(1)

  const [showTopButton, setShowTopButton] =
  useState(false)

  const [activeMood, setActiveMood] =
useState(

sessionStorage.getItem("moodFilter")
|| "Feel Good"

)

  const filters = [

    "Feel Good",
    "Heart Broken",
    "Dark Vibes",
    "Mind Fucked",
    "Late Night",
    "Adrenaline Rush",
    "Comfort Watch",
    "Romantic",
    "Goosebumps",
    "Wholesome"

  ]

  const moodMap = {

    "Feel Good": [35, 10751],
    "Heart Broken": [18, 10749],
    "Dark Vibes": [27, 53],
    "Mind Fucked": [878, 9648],
    "Late Night": [53, 80],
    "Adrenaline Rush": [28, 12],
    "Comfort Watch": [16, 35],
    "Romantic": [10749],
    "Goosebumps": [27, 9648],
    "Wholesome": [10751, 16]

  }

  useEffect(() => {

    const fetchMovies = async () => {

      setLoading(true)

      try {

        const genres =
        moodMap[activeMood]?.join(",")

        const response = await fetch(

`https://api.themoviedb.org/3/discover/movie?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genres}&page=${page}`

        )

        const data = await response.json()

        const newMovies =
        (data.results || []).filter(
          movie =>
          movie.poster_path
        )

        setMovies(prev => {

          const combined = [
            ...prev,
            ...newMovies
          ]

          const unique =
          combined.filter(
            (movie,index,self)=>

index===self.findIndex(
m=>m.id===movie.id
)

          )

          return unique

        })

      } catch(err) {

        console.log(err)

      }

      setLoading(false)

    }

    fetchMovies()

  }, [activeMood, page])

  useEffect(() => {

    setMovies([])

    setPage(1)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }, [activeMood])

  useEffect(() => {

sessionStorage.setItem(
"moodFilter",
activeMood
)

}, [activeMood])

useEffect(() => {

const savedScroll = sessionStorage.getItem(
"scroll-moods"
)

if (savedScroll) {

setTimeout(() => {

window.scrollTo({
top: parseInt(savedScroll),
behavior: "instant"
})

}, 100)

}

}, [])

  useEffect(() => {

    const handleScroll = () => {

      if (

        window.innerHeight +
        window.scrollY >=
        document.body.offsetHeight - 1200

        && !loading

      ) {

        setPage(prev => prev + 1)

      }

      setShowTopButton(
        window.scrollY > 800
      )

    }

    const saveScrollPosition = () => {

sessionStorage.setItem(
"scroll-moods",
window.scrollY
)

}

     window.addEventListener(
"scroll",
handleScroll
)

window.addEventListener(
"scroll",
saveScrollPosition
)

    return () => {

window.removeEventListener(
"scroll",
handleScroll
)

window.removeEventListener(
"scroll",
saveScrollPosition
)

}

  }, [loading])

  return (

    <div className="bg-black text-white min-h-screen pt-28 overflow-x-hidden">

      <Navbar />

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/85" />

      {/* RED GLOW */}
      <div className="absolute top-0 left-0 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-red-700/20 blur-[120px] md:blur-[180px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="px-4 md:px-16 pt-10 md:pt-20">

          <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-6">
            EVERY MOOD DESERVES A PERFECT STORY
          </p>

          <h1
            className="text-5xl md:text-[8rem] leading-[0.9]"
            style={{ fontFamily: "Anton" }}
          >
            MOODS
          </h1>

        </div>

        {/* FILTERS */}
        <div className="px-4 md:px-16 mt-10 md:mt-16 overflow-x-auto no-scrollbar">

          <div className="flex gap-3 md:gap-4 w-max pb-2">

            {filters.map((mood) => (

              <button
                key={mood}
                onClick={() => {

                  setMovies([])

                  setPage(1)

                  setActiveMood(mood)

                }}

                className={`
                  px-5 md:px-7 py-2 md:py-3
                  rounded-full
                  border
                  transition
                  duration-300
                  whitespace-nowrap

                  ${activeMood === mood

                    ? "bg-red-500 border-red-500 text-white shadow-[0_0_35px_rgba(255,0,0,0.5)]"

                    : "bg-white/5 backdrop-blur-md border-white/10 text-gray-300 hover:border-red-400 hover:text-white"

                  }
                `}
              >

                {mood}

              </button>

            ))}

          </div>

        </div>

        {/* MOVIES GRID */}
        <div className="px-4 md:px-16 py-12 md:py-20">

          <div className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-4
          md:gap-8
          ">

            {movies.map((movie,index) => (

              <Link
                to={`/movie/${movie.id}`}
                key={`${movie.id}-${index}`}
                className="group"
              >

                <div className="
                overflow-hidden
                rounded-[1.5rem]
                relative
                ">

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="
                    w-full
                    h-[220px]
                    md:h-[380px]
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-500
                    "
                  />

                  <div className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/30
                  transition
                  duration-500
                  " />

                </div>

                <h2 className="
                mt-4
                text-xs
                md:text-xl
                font-bold
                line-clamp-2
                ">

                  {movie.title}

                </h2>

                <div className="
                flex
                items-center
                justify-between
                mt-2
                ">

                  <p className="text-red-400">

                    ⭐ {movie.vote_average?.toFixed(1)}

                  </p>

                  <p className="text-gray-400 text-sm">

                    {movie.release_date?.split("-")[0]}

                  </p>

                </div>

              </Link>

            ))}

          </div>

          {loading && (

            <div className="
            text-center
            py-12
            text-gray-400
            ">

              Loading more movies...

            </div>

          )}

        </div>

      </div>

      {/* TOP BUTTON */}
      {showTopButton && (

        <button

          onClick={() => {

            window.scrollTo({

              top: 0,
              behavior: "smooth"

            })

          }}

          className="
          fixed
          bottom-6
          right-6
          w-12 h-12
          rounded-full
          bg-red-500
          flex
          items-center
          justify-center
          z-50
          "

        >

          <ChevronUp />

        </button>

      )}

    </div>

  )

}

export default Moods
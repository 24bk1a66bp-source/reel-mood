import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronUp } from "lucide-react"

function Series() {

  const [series, setSeries] = useState(() => {

const saved =
sessionStorage.getItem("seriesData")

return saved
? JSON.parse(saved)
: []

})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(
Number(
sessionStorage.getItem("seriesPage")
) || 1
)

  const [activeFilter, setActiveFilter] =
useState(
sessionStorage.getItem("seriesFilter")
|| "Trending"
)

  const [showTopButton, setShowTopButton] =
    useState(false)

  const filters = [

    "Trending",

    "Action",
    "Comedy",
    "Drama",
    "Crime",
    "Mystery",
    "Sci-Fi",
    "Animation",

    "English",
    "Hindi",
    "Korean",
    "Japanese",

    "Telugu",
    "Tamil",
    "Malayalam",
    "Kannada",
    "Spanish",
    "Chinese",
    "Thai",
    "Turkish"

  ]

  const genreMap = {

    Action: 10759,
    Comedy: 35,
    Drama: 18,
    Crime: 80,
    Mystery: 9648,
    "Sci-Fi": 10765,
    Animation: 16,

  }

  const languageMap = {

  English: "en",
  Hindi: "hi",
  Telugu: "te",
  Tamil: "ta",
  Malayalam: "ml",
  Kannada: "kn",
  Korean: "ko",
  Japanese: "ja",
  Spanish: "es",
  Chinese: "zh",
  Thai: "th",
  Turkish: "tr",

}

useEffect(() => {

const savedScroll =
sessionStorage.getItem(
"scroll-series"
)

if(savedScroll){

setTimeout(() => {

window.scrollTo(
0,
parseInt(savedScroll)
)

}, 300)

}

}, [])

useEffect(() => {

sessionStorage.setItem(
"seriesFilter",
activeFilter
)

sessionStorage.setItem(
"seriesPage",
page
)

sessionStorage.setItem(
"seriesData",
JSON.stringify(series)
)

}, [activeFilter, page, series])

  useEffect(() => {

    const fetchSeries = async () => {

      setLoading(true)

      try {

        let url = ""

        if(activeFilter === "Trending") {

          url =
`https://api.themoviedb.org/3/trending/tv/week?api_key=9919aac47cec3e307e57789106fe5797&page=${page}`

        }

        else if(genreMap[activeFilter]) {

          url =
`https://api.themoviedb.org/3/discover/tv?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genreMap[activeFilter]}&page=${page}`

        }

        else if(languageMap[activeFilter]) {

          url =
`https://api.themoviedb.org/3/discover/tv?api_key=9919aac47cec3e307e57789106fe5797&with_original_language=${languageMap[activeFilter]}&page=${page}`

        }

        const response = await fetch(url)

        const data = await response.json()

        const newSeries =
          (data.results || []).filter(
            item =>
              item.poster_path &&
              item.name
          )

        setSeries(prev => {

          const combined = [
            ...prev,
            ...newSeries
          ]

          return combined.filter(
            (item,index,self)=>

index===self.findIndex(
m=>m.id===item.id
)

          )

        })

      } catch(err) {

        console.log(err)

      }

      setLoading(false)

    }

    fetchSeries()

  }, [activeFilter, page])

  useEffect(() => {

    const handleScroll = () => {

        sessionStorage.setItem(
        "scroll-series",
        window.scrollY
        )

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

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [loading])

  return (

    <div className="bg-black text-white min-h-screen pt-28 overflow-x-hidden">
        <Navbar />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-black/85" />

      <div className="absolute top-0 left-0 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-red-700/20 blur-[120px] md:blur-[180px]" />

      <div className="relative z-10">

        

        <div className="px-8 md:px-16 pt-20">

          <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-6">
            BINGE THE BEST SHOWS
          </p>

          <h1
            className="text-6xl md:text-[8rem] leading-[0.9]"
            style={{ fontFamily: "Anton" }}
          >
            SERIES
          </h1>

        </div>

        <div className="px-8 md:px-16 mt-16 overflow-x-auto no-scrollbar">

          <div className="flex gap-4 min-w-max pb-2">

            {filters.map((filter) => (

              <button
                key={filter}
                onClick={() => {

                  setSeries([])

sessionStorage.removeItem(
"seriesData"
)

setPage(1)

setActiveFilter(filter)

                }}
                className={`
                  px-7 py-3
                  rounded-full
                  border
                  transition
                  duration-300
                  whitespace-nowrap

                  ${activeFilter === filter

                    ? "bg-red-500 border-red-500 text-white shadow-[0_0_35px_rgba(255,0,0,0.5)]"

                    : "bg-white/5 backdrop-blur-md border-white/10 text-gray-300 hover:border-red-400 hover:text-white"

                  }
                `}
              >

                {filter}

              </button>

            ))}

          </div>

        </div>

        <div className="px-8 md:px-16 py-20">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-8">

            {series.map((show,index) => (

              <Link
  to={`/tv/${show.id}`}
  state={{ from: "/series" }}
                key={`${show.id}-${index}`}
                className="group"
              >

                <div className="overflow-hidden rounded-[2rem] relative">

                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="
                    w-full
                    h-[260px]
                    md:h-[380px]
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-500
                    "
                  />

                </div>

                <h2 className="mt-4 text-sm md:text-xl font-bold line-clamp-2">

                  {show.name}

                </h2>

                <div className="flex items-center justify-between mt-2">

                  <p className="text-red-400">
                    ⭐ {show.vote_average?.toFixed(1)}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {show.first_air_date?.split("-")[0]}
                  </p>

                </div>

              </Link>

            ))}

          </div>

          {loading && (

            <div className="text-center py-12 text-gray-400">

              Loading more series...

            </div>

          )}

        </div>

      </div>

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

export default Series
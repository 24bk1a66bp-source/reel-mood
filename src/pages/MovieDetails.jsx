import { useEffect, useState } from "react"
import {
  useParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom"

import axios from "axios"

function MovieDetails() {

  const { id } = useParams()

  const location = useLocation()

  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)

  const [trailer, setTrailer] = useState(null)

  const [providers, setProviders] = useState([])
  const [providerLink, setProviderLink] = useState("")

  useEffect(() => {

    const fetchMovie = async () => {

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9919aac47cec3e307e57789106fe5797`
      )

      setMovie(response.data)

      const videoResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9919aac47cec3e307e57789106fe5797`
      )

      const trailerData = videoResponse.data.results.find(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube"
      )

      setTrailer(trailerData)

      const providerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=9919aac47cec3e307e57789106fe5797`
      )

      const results = providerResponse.data.results

      const regionData =
  results.IN ||
  results.US ||
  Object.values(results)[0]

const providerData =
  regionData?.flatrate ||
  []

setProviders(providerData)

setProviderLink(regionData?.link || "")

    }

    fetchMovie()

  }, [id])

  if (!movie) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        Loading...

      </div>

    )

  }

  return (

    <div className="bg-black text-white min-h-screen">

      {/* BACKDROP */}
      <div
className="
relative
h-[70vh]
md:h-[95vh]
bg-cover
bg-center
bg-no-repeat
"
        style={{
            backgroundPosition:
window.innerWidth < 768
? "center top"
: "center",
          backgroundImage:
            `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-8">

          <Link to="/">

            <h1 className="text-2xl md:text-3xl tracking-[0.35em] font-semibold">
              REELMOOD
            </h1>

          </Link>


          <button
            onClick={() =>
              navigate(location.state?.from || "/")
            }
            className="px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition duration-300"
          >
            Back
          </button>

        </nav>


        {/* MOVIE INFO */}
        <div className="relative z-10 flex items-end h-full px-8 md:px-16 pb-16">

          <div className="max-w-4xl">

            <h1
              className="text-5xl md:text-[6rem] leading-[0.95] mb-8"
              style={{
                fontFamily: "Anton",
                wordBreak: "break-word",
              }}
            >
              {movie.title}
            </h1>

            <p className="uppercase tracking-[0.4em] text-red-400 mb-5">
              CINEMATIC EXPERIENCE
            </p>

            <div className="flex items-center gap-6 mt-6 text-lg text-gray-300">

              <p>
                ⭐ {movie.vote_average.toFixed(1)}
              </p>

              <p>
                {movie.release_date}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* DETAILS */}
      <div className="px-8 md:px-16 py-16 grid md:grid-cols-[300px_1fr] gap-14">

        {/* POSTER */}
        <div>

          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-[2rem] w-full shadow-2xl"
          />

        </div>


        {/* CONTENT */}
        <div>

          <h2 className="text-4xl font-bold mb-8">
            Overview
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
            {movie.overview}
          </p>


          {/* GENRES */}
          <div className="flex flex-wrap gap-4 mt-10">

            {movie.genres.map((genre) => (

              <div
                key={genre.id}
                className="px-5 py-3 bg-zinc-900 rounded-full border border-white/10"
              >
                {genre.name}
              </div>

            ))}

          </div>


          {/* OTT */}
          <div className="mt-12">

            <h3 className="text-2xl font-bold mb-6">
              Available On
            </h3>

            <div className="flex flex-wrap gap-4">

              {providers.length > 0 ? (

                providers.map((provider) => (

                  <a

  href={
  provider.provider_name.includes("Netflix")
    ? `https://www.netflix.com/search?q=${movie.title}`

    : provider.provider_name.includes("Amazon")
    ? `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${movie.title}`

    : provider.provider_name.includes("Disney")
    ? `https://www.hotstar.com/in/search/query/${movie.title}`

    : provider.provider_name.includes("Jio")
    ? `https://www.jiocinema.com/search/${movie.title}`

    : provider.provider_name.includes("Zee5")
    ? `https://www.zee5.com/search?q=${movie.title}`

    : provider.provider_name.includes("Sony")
    ? `https://www.sonyliv.com/search/${movie.title}`

    : provider.provider_name.includes("Sun NXT")
    ? `https://www.sunnxt.com/search/${movie.title}`

    : provider.provider_name.includes("aha")
    ? `https://www.aha.video/search?q=${movie.title}`

    : provider.provider_name.includes("ETV Win")
    ? `https://www.etvwin.com/search?q=${movie.title}`

    : provider.provider_name.includes("Lionsgate")
    ? `https://www.lionsgateplay.com/search?q=${movie.title}`

    : provider.provider_name.includes("MX")
    ? `https://www.mxplayer.in/search/${movie.title}`

    : provider.provider_name.includes("YouTube")
    ? `https://www.youtube.com/results?search_query=${movie.title}`

    : provider.provider_name.includes("Apple")
    ? `https://tv.apple.com/search?term=${movie.title}`

    : provider.provider_name.includes("Hulu")
    ? `https://www.hulu.com/search?q=${movie.title}`

    : provider.provider_name.includes("Crunchyroll")
    ? `https://www.crunchyroll.com/search?q=${movie.title}`

    : provider.provider_name.includes("Peacock")
    ? `https://www.peacocktv.com/search?q=${movie.title}`

    : provider.provider_name.includes("Paramount")
    ? `https://www.paramountplus.com/search/?query=${movie.title}`

    : provider.provider_name.includes("Discovery")
    ? `https://www.discoveryplus.in/search/${movie.title}`

    : provider.provider_name.includes("MUBI")
    ? `https://mubi.com/search/films?query=${movie.title}`

    : provider.provider_name.includes("Tubi")
    ? `https://tubitv.com/search/${movie.title}`

    : provider.provider_name.includes("Plex")
    ? `https://watch.plex.tv/search?q=${movie.title}`

    : provider.provider_name.includes("Viu")
    ? `https://www.viu.com/search?q=${movie.title}`

    : provider.provider_name.includes("iQIYI")
    ? `https://www.iq.com/search?query=${movie.title}`

    : provider.provider_name.includes("Tencent")
    ? `https://v.qq.com/x/search/?q=${movie.title}`

    : provider.provider_name.includes("WeTV")
    ? `https://wetv.vip/search?q=${movie.title}`

    : provider.provider_name.includes("Rakuten")
    ? `https://www.rakutenviki.com/search?q=${movie.title}`

    : provider.provider_name.includes("Viki")
    ? `https://www.viki.com/search?q=${movie.title}`

    : provider.provider_name.includes("Hoichoi")
    ? `https://www.hoichoi.tv/search?q=${movie.title}`

    : provider.provider_name.includes("Google Play")
    ? `https://play.google.com/store/search?q=${movie.title}&c=movies`

    : provider.provider_name.includes("BookMyShow")
    ? `https://in.bookmyshow.com/explore/movies`

    : `https://www.google.com/search?q=${movie.title}+watch+online`
}
    

  target="_blank"
  rel="noreferrer"
  
  key={provider.provider_id}
  className="flex items-center gap-3 px-5 py-3 bg-zinc-900 rounded-full border border-white/10 hover:bg-white hover:text-black transition duration-300"
>

                    <img
                      src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-8 h-8 rounded-full"
                    />

                    <span>
                      {provider.provider_name}
                    </span>

                  </a>

                ))

              ) : (

                <p className="text-gray-400">
                  No streaming providers available.
                </p>

              )}

            </div>

          </div>


          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-12">

            <a
              href={
                trailer
                  ? `https://www.youtube.com/watch?v=${trailer.key}`
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
            >

              <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition duration-300">

                Watch Trailer

              </button>

            </a>


            <a
              href={`https://www.google.com/search?q=${movie.title}+watch+online`}
              target="_blank"
              rel="noreferrer"
            >

            </a>

          </div>

        </div>

      </div>

    </div>

  )

}

export default MovieDetails
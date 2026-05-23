import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom"

import axios from "axios"

function MovieDetails() {

  const { id, type } = useParams()

  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)

  const [trailer, setTrailer] = useState(null)

  const [showTrailer, setShowTrailer] = useState(false)

  const [providers, setProviders] = useState([])

  const [providerLink, setProviderLink] = useState("")

  const [similar, setSimilar] = useState([])

  const contentTitle =
movie?.title || movie?.name || ""

 useEffect(() => {

window.scrollTo(0, 0)

const fetchMovie = async () => {

  try {

    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=9919aac47cec3e307e57789106fe5797`
    )

    setMovie(response.data)

    const videoResponse = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=9919aac47cec3e307e57789106fe5797`
    )

      const videos = videoResponse.data.results || []

const filteredVideos = videos.filter((video) => {

const name = video.name?.toLowerCase() || ""

return (

video.site === "YouTube" &&

!name.includes("song") &&
!name.includes("lyrical") &&
!name.includes("audio") &&
!name.includes("jukebox")

)

})

 const trailerData =

filteredVideos.find(
(video) =>
video.type === "Trailer" &&
video.name?.toLowerCase().includes("official")
)

||

filteredVideos.find(
(video) =>
video.type === "Trailer"
)

||

filteredVideos.find(
(video) =>
video.type === "Teaser"
)

||

filteredVideos.find(
(video) =>
video.type === "Clip"
)

setTrailer(trailerData)

    const providerResponse = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=9919aac47cec3e307e57789106fe5797`
    )

    const results = providerResponse.data.results

    const regionData =
      results.IN ||
      results.US ||
      Object.values(results)[0]

    const providerData =
      regionData?.flatrate || []

    setProviders(providerData)

    setProviderLink(regionData?.link || "")

     let similarMovies = []

try {

const similarResponse = await axios.get(
`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=9919aac47cec3e307e57789106fe5797`
)

similarMovies =
(similarResponse.data.results || []).filter(
item => item.poster_path
)

} catch (err) {

console.log("SIMILAR ERROR:", err)

}

if (similarMovies.length === 0) {

const genreIds =
(response.data.genres || [])
.map(g => g.id)
.join(",")

const language =
response.data.original_language || "en"

const fallbackResponse = await axios.get(

`https://api.themoviedb.org/3/discover/${type}?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genreIds}&with_original_language=${language}`

)

similarMovies =
(fallbackResponse.data.results || [])
.filter(
item =>
item.poster_path &&
item.id !== response.data.id
)

if (similarMovies.length === 0) {

const backupResponse = await axios.get(

`https://api.themoviedb.org/3/discover/${type}?api_key=9919aac47cec3e307e57789106fe5797&with_original_language=${language}&sort_by=popularity.desc`

)

similarMovies =
(backupResponse.data.results || [])
.filter(
item =>
item.poster_path &&
item.id !== response.data.id
)

}

}

setSimilar(
similarMovies.slice(0, 12)
)

  } catch (err) {

    console.log("DETAILS ERROR:", err)

  }

}

    fetchMovie()

  }, [id, type])

  console.log(movie)

  if (!movie) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        Loading...

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* BACKDROP */}
      <div
className="
relative
mt-20
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
          backgroundImage: movie.backdrop_path

? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`

: `url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop)`,
        }}
      >

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />


        


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
              {movie.title || movie.name}
            </h1>

            <p className="uppercase tracking-[0.4em] text-red-400 mb-5">
              CINEMATIC EXPERIENCE
            </p>

            <div className="flex items-center gap-6 mt-6 text-lg text-gray-300">

              <p>
                ⭐ {movie.vote_average?.toFixed(1)}
              </p>

              <p>
                {movie.release_date || movie.first_air_date}
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
            src={
movie.poster_path

? `https://image.tmdb.org/t/p/w500${movie.poster_path}`

: "https://via.placeholder.com/500x750?text=No+Image"
}
            alt={movie.title || movie.name}
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

           {(movie.genres || []).map((genre) => (

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
    ? `https://www.netflix.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Amazon")
    ? `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${contentTitle}`

    : provider.provider_name.includes("Disney")
    ? `https://www.hotstar.com/in/search/query/${contentTitle}`

    : provider.provider_name.includes("Jio")
    ? `https://www.jiocinema.com/search/${contentTitle}`

    : provider.provider_name.includes("Zee5")
    ? `https://www.zee5.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Sony")
    ? `https://www.sonyliv.com/search/${contentTitle}`

    : provider.provider_name.includes("Sun NXT")
    ? `https://www.sunnxt.com/search/${contentTitle}`

    : provider.provider_name.includes("aha")
    ? `https://www.aha.video/search?q=${contentTitle}`

    : provider.provider_name.includes("ETV Win")
    ? `https://www.etvwin.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Lionsgate")
    ? `https://www.lionsgateplay.com/search?q=${contentTitle}`

    : provider.provider_name.includes("MX")
    ? `https://www.mxplayer.in/search/${contentTitle}`

    : provider.provider_name.includes("YouTube")
    ? `https://www.youtube.com/results?search_query=${contentTitle}`

    : provider.provider_name.includes("Apple")
    ? `https://tv.apple.com/search?term=${contentTitle}`

    : provider.provider_name.includes("Hulu")
    ? `https://www.hulu.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Crunchyroll")
    ? `https://www.crunchyroll.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Peacock")
    ? `https://www.peacocktv.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Paramount")
    ? `https://www.paramountplus.com/search/?query=${contentTitle}`

    : provider.provider_name.includes("Discovery")
    ? `https://www.discoveryplus.in/search/${contentTitle}`

    : provider.provider_name.includes("MUBI")
    ? `https://mubi.com/search/films?query=${contentTitle}`

    : provider.provider_name.includes("Tubi")
    ? `https://tubitv.com/search/${contentTitle}`

    : provider.provider_name.includes("Plex")
    ? `https://watch.plex.tv/search?q=${contentTitle}`

    : provider.provider_name.includes("Viu")
    ? `https://www.viu.com/search?q=${contentTitle}`

    : provider.provider_name.includes("iQIYI")
    ? `https://www.iq.com/search?query=${contentTitle}`

    : provider.provider_name.includes("Tencent")
    ? `https://v.qq.com/x/search/?q=${contentTitle}`

    : provider.provider_name.includes("WeTV")
    ? `https://wetv.vip/search?q=${contentTitle}`

    : provider.provider_name.includes("Rakuten")
    ? `https://www.rakutenviki.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Viki")
    ? `https://www.viki.com/search?q=${contentTitle}`

    : provider.provider_name.includes("Hoichoi")
    ? `https://www.hoichoi.tv/search?q=${contentTitle}`

    : provider.provider_name.includes("Google Play")
    ? `https://play.google.com/store/search?q=${contentTitle}&c=movies`

    : provider.provider_name.includes("BookMyShow")
    ? `https://in.bookmyshow.com/explore/movies`

    : `https://www.google.com/search?q=${contentTitle}+watch+online`
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

            <button

onClick={() => {

if (trailer) {

setShowTrailer(true)

}

else {

window.open(

`https://www.youtube.com/results?search_query=${contentTitle}+official+trailer`,

"_blank"

)

}

}}

className={`
px-8 py-4
rounded-full
font-semibold
transition duration-300

${trailer

? `
bg-white
text-black
hover:scale-105
cursor-pointer
`

: `
bg-zinc-800
text-gray-500
cursor-not-allowed
`
}

`}

>

{trailer
? "Watch Trailer"
: "Search Trailer"}

</button>

            <a
              href={`https://www.google.com/search?q=${contentTitle}+watch+online`}
              target="_blank"
              rel="noreferrer"
            >

            </a>

          </div>

        </div>

      </div>
      {/* SIMILAR */}
<div className="px-8 md:px-16 pb-24">

  <h2 className="text-4xl font-bold mb-10">

    Similar {type === "tv" ? "Series" : "Movies"}

  </h2>

  <div className="flex gap-7 overflow-x-auto no-scrollbar pb-2">

    {similar.map((item) => (

      <Link
to={`/${type}/${item.id}`}
        key={item.id}
        className="min-w-[220px] group"
      >

        <div className="overflow-hidden rounded-[2rem] relative">

          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="
            w-full
            h-[330px]
            object-cover
            group-hover:scale-105
            transition
            duration-500
            "
          />

        </div>

        <h3 className="mt-4 text-xl font-bold line-clamp-2">

          {item.title || item.name}

        </h3>

        <div className="flex items-center justify-between mt-2">

          <p className="text-red-400">

            ⭐ {item.vote_average?.toFixed(1)}

          </p>

          <p className="text-gray-400 text-sm">

            {(item.release_date || item.first_air_date)?.split("-")[0]}

          </p>

        </div>

      </Link>

    ))}

  </div>

</div>

{/* TRAILER MODAL */}
{showTrailer && trailer && (

<div className="
fixed inset-0
bg-black/90
z-[999]
flex items-center justify-center
p-4
">

<button
onClick={() => setShowTrailer(false)}
className="
absolute top-6 right-6
text-white text-4xl
z-50
"
>

✕

</button>

<div className="
w-full
max-w-6xl
aspect-video
rounded-[2rem]
overflow-hidden
shadow-2xl
">

<iframe
className="w-full h-full"
src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
title="Trailer"
allow="autoplay; encrypted-media"
allowFullScreen
/>

</div>

</div>

)}

    </div>

  )

}

export default MovieDetails
import { Link } from "react-router-dom"
import { useState } from "react"

function MovieCard({ movie }) {

  const [isHovered, setIsHovered] = useState(false)

  return (

    <Link
      to={`/${movie.media_type || "movie"}/${movie.id}`}
      className="group relative min-w-[220px] cursor-pointer transition duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* POSTER */}
      <div className="overflow-hidden rounded-[2rem] relative">

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className={`w-full h-[330px] object-cover transition duration-700 ${
            isHovered ? "scale-110 brightness-50" : ""
          }`}
        />

        {/* HOVER OVERLAY */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >

          <div className="bg-red-500/90 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-lg shadow-2xl">
            ▶ Watch
          </div>

        </div>

      </div>

      {/* MOVIE INFO */}
      <div className="mt-4">

        <h2 className="text-xl font-bold line-clamp-2">
          {movie.title || movie.name}
        </h2>

        <div className="flex items-center gap-4 mt-2 text-gray-300">

          <p className="text-red-400">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>

          <p>
            {(movie.release_date || movie.first_air_date)?.split("-")[0]}
          </p>

        </div>

      </div>

    </Link>

  )
}

export default MovieCard
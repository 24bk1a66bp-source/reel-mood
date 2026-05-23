import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { searchMovies } from "../api/tmdb"

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [searchOpen, setSearchOpen] =
    useState(false)

  const [search, setSearch] =
    useState("")

  const [searchResults, setSearchResults] =
    useState([])

  const searchRef = useRef()

  useEffect(() => {

    const fetchSearch = async () => {

      if(search.trim() === ""){

        setSearchResults([])

        return

      }

      const data =
        await searchMovies(search)

      setSearchResults(data)

    }

    fetchSearch()

  }, [search])

  useEffect(() => {

    const handleClickOutside = (e) => {

      if(

        searchRef.current &&
        !searchRef.current.contains(e.target)

      ){

        setSearchOpen(false)

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )

    }

  }, [])

  return (

    <>

      <nav
      className="
      fixed top-0 left-0
      w-full z-50
      flex items-center justify-between
      px-6 md:px-16 py-4
      bg-black/30 backdrop-blur-md
      border-b border-white/10
      "
      >

        <Link to="/">

          <h1 className="text-2xl md:text-4xl tracking-[0.25em] text-white font-semibold">

            REELMOOD

          </h1>

        </Link>

        <div className="hidden md:flex items-center gap-10 text-base font-medium text-gray-200">

           <div className="relative">

<input
type="text"
placeholder="Search movies & series..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
className="
w-[300px]
px-6 py-3
bg-zinc-900/90
backdrop-blur-xl
border border-white/10
rounded-full
text-white
outline-none
transition
duration-300
focus:border-red-500
"
/>

{search.trim() !== "" && (

<div
className="
absolute
top-16
left-0
w-full
bg-zinc-900
rounded-[2rem]
overflow-hidden
border border-white/10
max-h-[500px]
overflow-y-auto
shadow-2xl
"
>

{searchResults.length > 0 ? (

searchResults
.slice(0,30)
.map((movie) => (

<Link

to={`/${movie.media_type || "movie"}/${movie.id}`}

onClick={() => {

setSearch("")
setSearchResults([])
setSearchOpen(false)

}}

key={movie.id}
className="
flex items-center gap-5
p-4
hover:bg-white/5
transition
border-b border-white/5
"
>

<img
src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
alt={movie.title || movie.name}
className="
w-16 h-24
object-cover
rounded-xl
"
/>

<div>

<h3 className="text-lg font-semibold text-white">

{movie.title || movie.name}

</h3>

<p className="text-gray-400">

{(movie.release_date || movie.first_air_date)?.slice(0,4)}

</p>

</div>

</Link>

))

) : (

<div className="p-8 text-center text-gray-400">

No results found.

</div>

)}

</div>

)}

</div>

          <Link to="/">Home</Link>

          <Link to="/movies">Movies</Link>

          <Link to="/series">Series</Link>

          <Link to="/moods">Moods</Link>

        </div>

        <div className="md:hidden flex items-center gap-5">

          <button
          onClick={() =>
            setSearchOpen(!searchOpen)
          }
          className="text-2xl"
          >

            <Search size={24} />

          </button>

          <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="text-3xl text-white"
          >

            ☰

          </button>

        </div>

      </nav>

      {searchOpen && (

        <div
        className="
        md:hidden
        fixed top-20 left-0
        w-full px-4 z-50
        "
        >

          <input
          type="text"
          placeholder="Search movies & series..."
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
          className="
          w-full
          px-6 py-4
          bg-zinc-900
          border border-white/10
          rounded-full
          text-white
          outline-none
          "
          />

        </div>

      )}

      {menuOpen && (

        <div
        className="
        md:hidden
        fixed top-20 left-0
        w-full
        bg-black/95
        backdrop-blur-xl
        z-40
        flex flex-col
        items-center
        py-8 gap-6
        "
        >

          <Link to="/">Home</Link>

          <Link to="/movies">Movies</Link>

          <Link to="/series">Series</Link>

          <Link to="/moods">Moods</Link>

        </div>

      )}

    </>

  )

}

export default Navbar
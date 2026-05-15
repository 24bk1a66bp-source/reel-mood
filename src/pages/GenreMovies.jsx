import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { useParams, Link, useLocation } from "react-router-dom"

const genreMap = {
  Action: 28,
  Comedy: 35,
  Romance: 10749,
  Horror: 27,
  Thriller: 53,
  "Sci-Fi": 878,
  Drama: 18,
  Adventure: 12,
  Fantasy: 14,
  Crime: 80,
}

const languageMap = {
  all: "",
  Telugu: "te",
  Tamil: "ta",
  Hindi: "hi",
  Malayalam: "ml",
  Kannada: "kn",
  English: "en",
  Korean: "ko",
  Japanese: "ja",
}

function GenreMovies() {

  const { genreName } = useParams()
  const location = useLocation()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [restored, setRestored] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)

  const [selectedLanguage, setSelectedLanguage] =
useState(() => {

return (

sessionStorage.getItem(
`filter-${window.location.pathname}`
) || "all"

)

})

  const [page, setPage] = useState(() => {

    const savedPage =
      sessionStorage.getItem(
        `page-${window.location.pathname}`
      )

    return savedPage
      ? parseInt(savedPage)
      : 1

  })

  useEffect(() => {

    setMovies([])
    setPage(1)
    setRestored(false)

  }, [genreName, selectedLanguage])


  useEffect(() => {

    const handleTopButton = () => {

      setShowTopButton(
        window.scrollY > 800
      )

    }

    window.addEventListener(
      "scroll",
      handleTopButton
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleTopButton
      )

  }, [])


  useEffect(() => {

    const fetchMovies = async () => {

      setLoading(true)

      try {

        const genreId =
          genreMap[genreName]

        let allMovies = []

        for (
          let i = 1;
          i <= page;
          i++
        ) {

          const languageFilter =
            selectedLanguage !== "all"
              ? `&with_original_language=${languageMap[selectedLanguage]}`
              : ""

          const res =
            await fetch(

`https://api.themoviedb.org/3/discover/movie?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genreId}${languageFilter}&page=${i}`

            )

          const data =
            await res.json()

          allMovies = [

            ...allMovies,

            ...(data.results || [])
              .filter(
                movie =>
                movie.poster_path
              )

          ]

        }

        const unique =
          allMovies.filter(
            (movie,index,self)=>

index===self.findIndex(
m=>m.id===movie.id
)

)

        setMovies(unique)

      } catch(err){

        console.log(err)

      }

      setLoading(false)

    }

    fetchMovies()

  },[
    genreName,
    page,
    selectedLanguage
  ])


  useEffect(()=>{

const handleScroll=()=>{

if(

window.innerHeight+
window.scrollY>=
document.body.offsetHeight-1000

&& !loading

){

setPage(prev=>prev+1)

}

}

window.addEventListener(
"scroll",
handleScroll
)

return()=>window.removeEventListener(
"scroll",
handleScroll
)

},[loading])


  return (

<div className="bg-black text-white min-h-screen px-4 md:px-16 py-10">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

<div>

<p className="uppercase tracking-[0.35em] text-xs md:text-sm text-red-400 mb-4">

Explore Genre

</p>

<h1
className="text-5xl md:text-[7rem]"
style={{
fontFamily:"Anton"
}}
>

{genreName}

</h1>

</div>


<div className="flex gap-4 flex-wrap">

<select

value={selectedLanguage}

onChange={(e)=>{

setSelectedLanguage(
e.target.value
)

sessionStorage.setItem(
`filter-${location.pathname}`,
e.target.value
)

}}

className="
bg-zinc-900
px-5 py-3
rounded-full
outline-none
border
border-white/10
"

>

<option value="all">
All Languages
</option>

<option>Telugu</option>
<option>Tamil</option>
<option>Hindi</option>
<option>Malayalam</option>
<option>Kannada</option>
<option>English</option>
<option>Korean</option>
<option>Japanese</option>

</select>

<Link to="/genres">

<button className="
px-6 py-3
bg-white
text-black
rounded-full
font-semibold
">

Back

</button>

</Link>

</div>

</div>


<div className="
grid
grid-cols-2
md:grid-cols-5
gap-4
md:gap-8
">

{movies.map(
(movie,index)=>(

<Link
to={`/movie/${movie.id}`}
state={{
from:
`/genre/${genreName}`
}}
key={`${movie.id}-${index}`}
className="group"
>

<div className="
overflow-hidden
rounded-[1.5rem]
">

<img
src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
alt={movie.title}
className="
w-full
h-[240px]
md:h-[350px]
object-cover
group-hover:scale-105
transition
duration-500
"
/>

</div>

<h2 className="
mt-3
text-sm
md:text-xl
font-bold
line-clamp-2
">

{movie.title}

</h2>

<p className="
text-red-400
text-sm
mt-1
">

⭐ {movie.vote_average?.toFixed(1)}

</p>

</Link>

)

)}

</div>


{showTopButton && (

<button

onClick={()=>{

window.scrollTo({

top:0,
behavior:"smooth"

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

<ChevronUp/>

</button>

)}


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

)

}

export default GenreMovies
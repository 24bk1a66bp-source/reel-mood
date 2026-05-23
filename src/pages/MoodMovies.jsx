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

function MoodMovies() {

  const { moodName } = useParams()
  const location = useLocation()

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)

  const [selectedLanguage,
setSelectedLanguage] =
useState(()=>{

return(

sessionStorage.getItem(
`filter-${window.location.pathname}`
) || "all"

)

})

  const bgStyle =
    moodStyles[moodName] ||
    "from-black via-zinc-900 to-black"

  useEffect(() => {

    setMovies([])
    setPage(1)

  }, [moodName, selectedLanguage])


  useEffect(() => {

    const handleTopButton=()=>{

      setShowTopButton(
      window.scrollY > 800
      )

    }

    window.addEventListener(
      "scroll",
      handleTopButton
    )

    return ()=>window
    .removeEventListener(
      "scroll",
      handleTopButton
    )

  },[])


  useEffect(() => {

    const fetchMovies=async()=>{

      setLoading(true)

      try{

      let allMovies=[]

      const genreIds =
      moodMap[moodName]

      for(
      let i=1;
      i<=page;
      i++
      ){

const languageFilter=
selectedLanguage!=="all"
?`&with_original_language=${languageMap[selectedLanguage]}`
:""

const res=
await fetch(

`https://api.themoviedb.org/3/discover/movie?api_key=9919aac47cec3e307e57789106fe5797&with_genres=${genreIds}${languageFilter}&page=${i}`

)

const data=
await res.json()

allMovies=[

...allMovies,

...(data.results||[])
.filter(
movie=>movie.poster_path
)

]

}

const unique=
allMovies.filter(
(movie,index,self)=>

index===
self.findIndex(
m=>m.id===movie.id
)

)

setMovies(unique)

}catch(err){

console.log(err)

}

setLoading(false)

}

fetchMovies()

},[
moodName,
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

setPage(
prev=>prev+1
)

}

}

window.addEventListener(
"scroll",
handleScroll
)

return()=>window
.removeEventListener(
"scroll",
handleScroll
)

},[loading])


return(

<div className={`min-h-screen text-white bg-gradient-to-br ${bgStyle}`}>

<nav className="flex items-center justify-between px-4 md:px-16 py-6 border-b border-white/10">

<Link to="/">

<h1
className="text-xl md:text-3xl tracking-[0.25em]"
>

REELMOOD

</h1>

</Link>

<Link to="/moods">

<button className="
px-6 py-3
bg-white
text-black
rounded-full
">

Back

</button>

</Link>

</nav>


<div className="px-4 md:px-16 py-10">

<h1
className="text-5xl md:text-8xl mb-8"
style={{
fontFamily:"Anton"
}}
>

{moodName}

</h1>

<div className="mb-10">

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
  text-white
  px-5 py-3
  rounded-2xl
  border border-white/10
  outline-none
  shadow-lg
  w-[180px]
  hover:border-red-500
  transition duration-300
  "
>

<option value="all">
All Languages
</option>

<option value="Telugu">
Telugu
</option>

<option value="Tamil">
Tamil
</option>

<option value="Hindi">
Hindi
</option>

<option value="Malayalam">
Malayalam
</option>

<option value="Kannada">
Kannada
</option>

<option value="English">
English
</option>

<option value="Korean">
Korean
</option>

<option value="Japanese">
Japanese
</option>

</select>

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
to={`/${movie.media_type || "movie"}/${movie.id}`}
key={`${movie.id}-${index}`}
state={{
from:
`/mood/${moodName}`
}}
>

<div className="
overflow-hidden
rounded-[1.5rem]
">

<img
src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
alt={movie.title || movie.name}
className="
w-full
h-[240px]
md:h-[350px]
object-cover
hover:scale-105
transition
duration-500
"
/>

</div>

<h2 className="
mt-3
text-sm
md:text-lg
font-bold
line-clamp-2
">

{movie.title || movie.name}

</h2>

<p className="
text-red-300
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

onClick={()=>

window.scrollTo({

top:0,
behavior:"smooth"

})

}

className="
fixed
bottom-6
right-6
w-12
h-12
rounded-full
bg-red-500
flex
items-center
justify-center
"

>

<ChevronUp/>

</button>

)}

{loading&&(

<div className="
text-center
py-10
text-gray-300
">

Loading more movies...

</div>

)}

</div>

</div>

)

}

export default MoodMovies
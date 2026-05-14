import { Link } from "react-router-dom"

function Languages() {

  const languages = [
    "Telugu",
    "Tamil",
    "Hindi",
    "Malayalam",
    "Kannada",
    "English",
    "Korean",
    "Japanese",
    "French",
    "Spanish",
    "Anime",
  ]

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center px-8">

      <div className="text-center w-full max-w-7xl">

        <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-5">
          Explore World Cinema
        </p>

        <h1
          className="text-6xl md:text-[7rem] leading-none mb-16"
          style={{ fontFamily: "Anton" }}
        >
          LANGUAGES
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {languages.map((language) => (

            <Link
              to={`/language/${language}`}
              key={language}
            >

              <div className="px-10 py-8 rounded-[2rem] bg-zinc-900 hover:bg-red-500 transition duration-300 cursor-pointer text-2xl font-semibold hover:scale-105">

                {language}

              </div>

            </Link>

          ))}

        </div>

        <Link to="/">

          <button className="mt-16 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition duration-300">

            Back Home

          </button>

        </Link>

      </div>

    </div>

  )

}

export default Languages
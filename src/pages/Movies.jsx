import { Link } from "react-router-dom"

function Moods() {

  const moods = [

    "Dark",
    "Epic",
    "Action",
    "Funny",
    "Romantic",
    "Emotional",
    "Fantasy",
    "Mind Blowing",
    "Horror",

  ]

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center px-8">

      <div className="text-center w-full max-w-7xl">

        <p className="uppercase tracking-[0.4em] text-sm text-red-400 mb-5">
          Explore Cinematic Vibes
        </p>

        <h1
          className="text-6xl md:text-[7rem] leading-none mb-16"
          style={{ fontFamily: "Anton" }}
        >
          MOODS
        </h1>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {moods.map((mood) => (

            <Link
              to={`/mood/${mood}`}
              key={mood}
            >

              <div className="px-10 py-10 rounded-[2rem] bg-zinc-900 hover:bg-red-500 transition duration-300 cursor-pointer hover:scale-105">

                <h2 className="text-3xl font-bold mb-3">
                  {mood}
                </h2>

                <p className="text-gray-400 text-sm">
                  Explore movies matching this vibe.
                </p>

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

export default Moods
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

    <div className="bg-black text-white min-h-screen px-4 md:px-8 py-16">

      <div className="text-center w-full max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-red-400 mb-4">

          Explore Cinematic Vibes

        </p>

        <h1
          className="text-5xl md:text-[7rem] leading-none mb-10 md:mb-16"
          style={{ fontFamily: "Anton" }}
        >
          MOODS
        </h1>


        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">

          {moods.map((mood) => (

            <Link
              to={`/mood/${mood}`}
              key={mood}
            >

              <div
                className="
                h-32 md:h-44
                px-3
                rounded-[1.8rem]
                bg-zinc-900
                hover:bg-red-500
                transition duration-300
                cursor-pointer
                hover:scale-105
                shadow-lg
                flex flex-col
                items-center
                justify-center
                "
              >

                <h2 className="text-lg md:text-2xl font-bold mb-2">

                  {mood}

                </h2>

                <p className="text-gray-400 text-[11px] md:text-sm leading-tight">

                  Explore movies matching this vibe.

                </p>

              </div>

            </Link>

          ))}

        </div>


        <Link to="/">

          <button
            className="
            mt-12 md:mt-16
            px-6 py-3 md:px-8 md:py-4
            bg-white text-black
            rounded-full
            font-semibold
            hover:scale-105
            transition duration-300
            "
          >

            Back Home

          </button>

        </Link>

      </div>

    </div>

  )

}

export default Moods
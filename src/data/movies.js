const movies = [

  {
    title: "Joker",
    image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    mood: "Dark",
  },

  {
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    mood: "Mind Blowing",
  },

  {
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    mood: "Mind Blowing",
  },

  {
    title: "Fight Club",
    image: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    mood: "Chaotic",
  },

  {
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    mood: "Dark",
  },

  {
    title: "Whiplash",
    image: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    mood: "Motivating",
  },

  {
    title: "La La Land",
    image: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    mood: "Romantic",
  },

  {
    title: "Avengers Endgame",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    mood: "Epic",
  },

  {
    title: "Spider-Man No Way Home",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    mood: "Fun",
  },

  {
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    mood: "Intense",
  },

  {
    title: "Dune",
    image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    mood: "Epic",
  },

  {
    title: "Tenet",
    image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    mood: "Mind Blowing",
  },

  {
    title: "John Wick",
    image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    mood: "Action",
  },

  {
    title: "The Batman",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    mood: "Dark",
  },

  {
    title: "RRR",
    image: "https://image.tmdb.org/t/p/w500/lrWj4MV6x8WzQ5v8Vq0s6tWgM2T.jpg",
    mood: "Epic",
  },

  {
    title: "Baahubali",
    image: "https://image.tmdb.org/t/p/w500/9BAjt8nSSms62uOVYn1t3C3dVto.jpg",
    mood: "Epic",
  },

  {
    title: "KGF",
    image: "https://image.tmdb.org/t/p/w500/ltHlJwvxKv7d0ooCiKSAvfwV9tX.jpg",
    mood: "Mass",
  },

  {
    title: "Pushpa",
    image: "https://image.tmdb.org/t/p/w500/6gg0xQ1s5e2P4d25xBf0sV3G0pK.jpg",
    mood: "Mass",
  },

  {
    title: "Jailer",
    image: "https://m.media-amazon.com/images/M/MV5BNDM5OWE2NWMtYzU2Zi00NmQ0LTliMDItOWQ1YjY0YWQ2M2YxXkEyXkFqcGc@._V1_.jpg",
    mood: "Mass",
  },

  {
    title: "Animal",
    image: "https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    mood: "Intense",
  },

  {
    title: "Your Name",
    image: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    mood: "Emotional",
  },

  {
    title: "Suzume",
    image: "https://image.tmdb.org/t/p/w500/vIeu8WysZrTSFb2uhPViKjX9EcC.jpg",
    mood: "Emotional",
  },

  {
    title: "Spirited Away",
    image: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    mood: "Fantasy",
  },

  {
    title: "The Conjuring",
    image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    mood: "Horror",
  },

  {
    title: "Annabelle",
    image: "https://image.tmdb.org/t/p/w500/yAgxZ5jJN4k2tjln4R3Oy4tT2bH.jpg",
    mood: "Horror",
  },

  {
    title: "IT",
    image: "https://image.tmdb.org/t/p/w500/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    mood: "Horror",
  },

  {
    title: "The Nun",
    image: "https://image.tmdb.org/t/p/w500/sFC1ElvoKGdHJIWRpNB3xWJ9lJA.jpg",
    mood: "Horror",
  },

  {
    title: "Titanic",
    image: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    mood: "Romantic",
  },

  {
    title: "The Notebook",
    image: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
    mood: "Romantic",
  },

  {
    title: "3 Idiots",
    image: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8Tew.jpg",
    mood: "Feel Good",
  },

  {
    title: "Zindagi Na Milegi Dobara",
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3Njc5NF5BMl5BanBnXkFtZTcwNzQ5ODc5NQ@@._V1_.jpg",
    mood: "Feel Good",
  },

  {
    title: "Deadpool",
    image: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
    mood: "Funny",
  },

  {
    title: "Free Guy",
    image: "https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
    mood: "Funny",
  },

  {
    title: "Extraction",
    image: "https://image.tmdb.org/t/p/w500/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg",
    mood: "Action",
  },

  {
    title: "Top Gun Maverick",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    mood: "Adrenaline",
  },

  {
    title: "Doctor Strange",
    image: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    mood: "Fantasy",
  },

  {
    title: "Black Panther",
    image: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    mood: "Epic",
  },

  {
    title: "Iron Man",
    image: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    mood: "Action",
  },

  {
    title: "Avatar",
    image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    mood: "Fantasy",
  },

  {
    title: "Avatar The Way of Water",
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    mood: "Fantasy",
  },

  {
    title: "Parasite",
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    mood: "Thriller",
  },

  {
    title: "The Social Network",
    image: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    mood: "Motivating",
  },

  {
    title: "The Wolf of Wall Street",
    image: "https://image.tmdb.org/t/p/w500/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
    mood: "Chaotic",
  },

  {
    title: "Shutter Island",
    image: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg",
    mood: "Mind Blowing",
  },

  {
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    mood: "Sci-Fi",
  },

  {
    title: "1917",
    image: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    mood: "Intense",
  },

  {
    title: "The Prestige",
    image: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg",
    mood: "Mystery",
  },

  {
    title: "Gravity",
    image: "https://image.tmdb.org/t/p/w500/kZ2nZw8D681aphje8NJi8EfbL1U.jpg",
    mood: "Sci-Fi",
  },

  {
    title: "Cars",
    image: "https://image.tmdb.org/t/p/w500/qa6HCwP4Z15l3hpsASz3auugEW6.jpg",
    mood: "Fun",
  },

  {
    title: "Coco",
    image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    mood: "Emotional",
  },

  {
    title: "Soul",
    image: "https://image.tmdb.org/t/p/w500/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
    mood: "Feel Good",
  },

  {
    title: "Up",
    image: "https://image.tmdb.org/t/p/w500/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg",
    mood: "Emotional",
  },

]

export default movies
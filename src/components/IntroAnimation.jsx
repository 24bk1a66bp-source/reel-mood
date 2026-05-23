import { motion } from "framer-motion"

function IntroAnimation() {

const text = "REELMOOD"

return (

<div
className="
fixed inset-0
z-[9999]
bg-black
flex flex-col
items-center
justify-center
overflow-hidden
"
>

{/* RED GLOW */}
<div
className="
absolute
w-[500px]
h-[500px]
bg-red-600/20
blur-[140px]
rounded-full
"
/>

{/* LOGO TEXT */}
<div className="flex">

{text.split("").map((letter, index) => (

<motion.h1

key={index}

initial={{
opacity: 0,
y: 80
}}

animate={{
opacity: 1,
y: 0
}}

transition={{
delay: index * 0.15,
duration: 0.6
}}

className="
text-white
text-5xl
md:text-8xl
font-bold
tracking-[0.35em]
"
style={{
fontFamily: "Anton"
}}
>

{letter}

</motion.h1>

))}

</div>

{/* CAPTION */}
<motion.p

initial={{
opacity: 0,
y: 20
}}

animate={{
opacity: 1,
y: 0
}}

transition={{
delay: 1,
duration: 1
}}

className="
mt-6
text-gray-400
tracking-[0.15em]
md:tracking-[0.3em]
uppercase
text-[9px]
md:text-sm
text-center
px-4
"
>

Every Emotion Deserves A Perfect Story

</motion.p>

</div>

)

}

export default IntroAnimation
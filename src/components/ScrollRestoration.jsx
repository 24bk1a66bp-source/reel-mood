import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollRestoration() {

  const location = useLocation()

  useEffect(() => {

    const savedScrollPosition =
      sessionStorage.getItem(
        `scroll-${location.pathname}`
      )

    if (savedScrollPosition) {

      setTimeout(() => {

        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: "instant",
        })

      }, 100)

    }

  }, [location.pathname])

  useEffect(() => {

    const saveScrollPosition = () => {

      sessionStorage.setItem(
        `scroll-${location.pathname}`,
        window.scrollY
      )

    }

    window.addEventListener(
      "scroll",
      saveScrollPosition
    )

    return () => {

      window.removeEventListener(
        "scroll",
        saveScrollPosition
      )

    }

  }, [location.pathname])

  return null
}

export default ScrollRestoration
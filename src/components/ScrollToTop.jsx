import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToTop() {

  const { pathname } = useLocation()

  useEffect(() => {

    const savedPosition =
      sessionStorage.getItem(pathname)

    if (savedPosition) {

      window.scrollTo(
        0,
        parseInt(savedPosition)
      )

    }

  }, [pathname])

  useEffect(() => {

    const saveScroll = () => {

      sessionStorage.setItem(
        pathname,
        window.scrollY
      )

    }

    window.addEventListener(
      "scroll",
      saveScroll
    )

    return () => {

      window.removeEventListener(
        "scroll",
        saveScroll
      )

    }

  }, [pathname])

  return null
}

export default ScrollToTop
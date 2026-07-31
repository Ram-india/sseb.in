import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeSlides } from '../data/homeSlides'
import useReducedMotion from '../hooks/useReducedMotion'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from './Icons'

const INTERVAL = 6500
const SWIPE_THRESHOLD = 50

const COUNT = homeSlides.length
const pad = (value) => String(value).padStart(2, '0')

// Replacement for the Revolution Slider on index.php — same slides and fade,
// without jQuery. Autoplay pauses on hover, on keyboard focus and when the tab
// is hidden; all motion is dropped for prefers-reduced-motion.
export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const reducedMotion = useReducedMotion()
  const captionRef = useRef(null)
  const sectionRef = useRef(null)

  // Slides whose <img> is mounted: the current one, its neighbours, and
  // anything already shown. Keeps the first paint down to a single image.
  const [mounted, setMounted] = useState(() => new Set([0, 1, COUNT - 1]))
  const touchStartX = useRef(null)

  const goTo = useCallback((next) => {
    setIndex(((next % COUNT) + COUNT) % COUNT)
  }, [])

  const showNext = useCallback(() => goTo(index + 1), [goTo, index])
  const showPrevious = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    setMounted((current) => {
      const neighbours = [index, (index + 1) % COUNT, (index - 1 + COUNT) % COUNT]
      if (neighbours.every((slide) => current.has(slide))) return current
      return new Set([...current, ...neighbours])
    })
  }, [index])

  // Scroll parallax: the caption lifts away and fades as the hero leaves,
  // while the photograph stays put. Doing it this way costs no image
  // resolution — these files are barely big enough for the frame as it is.
  useEffect(() => {
    const caption = captionRef.current
    const section = sectionRef.current
    if (!caption || !section || reducedMotion) return undefined

    let frame = null

    const update = () => {
      frame = null
      const height = section.offsetHeight || 1
      const progress = Math.min(1, Math.max(0, window.scrollY / height))
      caption.style.transform = `translate3d(0, ${(progress * -90).toFixed(1)}px, 0)`
      caption.style.opacity = String(Math.max(0, 1 - progress * 1.6))
    }

    const request = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      caption.style.transform = ''
      caption.style.opacity = ''
    }
  }, [reducedMotion])

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const playing = !userPaused && !hovering && !keyboardFocus && tabVisible && !reducedMotion

  useEffect(() => {
    if (!playing) return undefined
    const timer = setTimeout(showNext, INTERVAL)
    return () => clearTimeout(timer)
  }, [playing, showNext])

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }
  }

  // Only a keyboard user landing in the carousel should stop it; a mouse click
  // on a control focuses the button too, and that should not halt playback.
  const onFocusCapture = (event) => {
    try {
      if (event.target.matches(':focus-visible')) setKeyboardFocus(true)
    } catch {
      // Browsers without :focus-visible throw on the selector — treat any
      // focus as keyboard focus there rather than losing the pause entirely.
      setKeyboardFocus(true)
    }
  }

  const onTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) showNext()
      else showPrevious()
    }
    touchStartX.current = null
  }

  const activeSlide = homeSlides[index]
  const arrowClass =
    'absolute top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 p-3 text-white opacity-70 backdrop-blur-sm transition hover:border-accent hover:bg-accent hover:opacity-100 focus-visible:opacity-100 md:flex'

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured SSEB projects"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={onFocusCapture}
      onBlurCapture={() => setKeyboardFocus(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="hero-fullscreen on-dark group relative w-full select-none overflow-hidden bg-deep"
    >
      {homeSlides.map((slide, slideIndex) => {
        const isActive = slideIndex === index
        return (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${COUNT}: ${slide.heading}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {mounted.has(slideIndex) && (
              <img
                src={slide.image}
                alt={slide.alt}
                loading={slideIndex === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full w-full object-cover object-center will-change-transform ${
                  isActive && !reducedMotion ? 'animate-heroZoom' : ''
                }`}
              />
            )}

            {/* Neutral scrim from the left keeps the caption legible without
                tinting the photography; navy only at the foot, under the controls. */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/22 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/65 via-transparent to-transparent" />
          </div>
        )
      })}

      {/* caption — re-keyed so it animates in on every slide change */}
      <div
        ref={captionRef}
        className="pointer-events-none absolute inset-0 flex items-center will-change-transform"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div key={index} className="max-w-4xl animate-heroRise pb-16 sm:pb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent [text-shadow:0_1px_3px_rgba(0,0,0,0.7),0_2px_14px_rgba(0,0,0,0.55)]">
              {activeSlide.heading}
            </p>

            {activeSlide.caption && (
              <h2 className="display-1 mt-4 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55),0_3px_26px_rgba(0,0,0,0.55)]">
                {activeSlide.caption}
              </h2>
            )}

            {activeSlide.subCaption && (
              <p className="mt-4 text-lg text-white/85">{activeSlide.subCaption}</p>
            )}

            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <Link to="/projects/completed-projects" className="btn-light">
                View Our Projects
              </Link>
              <Link to="/about/company-profile" className="btn-light-outline">
                About SSEB
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous slide"
        className={`${arrowClass} left-2 lg:left-6`}
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Next slide"
        className={`${arrowClass} right-2 lg:right-6`}
      >
        <ChevronRightIcon />
      </button>

      {/* bottom bar: counter, progress indicators, play/pause */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 sm:pb-5">
          <div className="flex items-center gap-4">
            <p className="hidden text-sm font-medium tabular-nums text-white/60 sm:block">
              <span className="text-base text-white">{pad(index + 1)}</span>
              <span className="mx-1">/</span>
              {pad(COUNT)}
            </p>

            <div className="flex flex-1 items-center gap-1.5 sm:gap-2">
              {homeSlides.map((slide, slideIndex) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Go to slide ${slideIndex + 1}: ${slide.heading}`}
                  aria-current={slideIndex === index}
                  className="group/dot h-6 flex-1 py-2.5"
                >
                  <span className="block h-1 w-full overflow-hidden rounded-full bg-white/30 transition-colors group-hover/dot:bg-white/50">
                    {slideIndex === index && (
                      <span
                        key={`${index}-${playing}`}
                        style={playing ? { animationDuration: `${INTERVAL}ms` } : undefined}
                        className={`block h-full w-full origin-left rounded-full bg-accent ${
                          playing ? 'animate-heroProgress' : ''
                        }`}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? 'Start slideshow' : 'Pause slideshow'}
              className="rounded-full border border-white/30 p-2 text-white/80 transition hover:border-accent hover:text-white"
            >
              {userPaused || reducedMotion ? <PlayIcon /> : <PauseIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* announced to screen readers while autoplay is not running */}
      <p aria-live="polite" className="sr-only">
        {!playing ? `Slide ${index + 1} of ${COUNT}: ${activeSlide.heading}` : ''}
      </p>
    </section>
  )
}

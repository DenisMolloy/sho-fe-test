/**
 *
 * MIT License
 *
 * Copyright 2021 Shogun, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import * as React from 'react'
import { Fade, useTheme } from '@chakra-ui/react'
import { useSwipeable } from 'react-swipeable'
import Container from 'Components/Container'
import Icon from 'Components/Icon'
import IconButton from 'Components/IconButton'
import Image from 'Components/Image'
import Grid from 'Components/Grid'
import HStack from 'Components/HStack'

/**
 * @typedef { React.MouseEvent | TouchEvent | MouseEvent } HandledEvents
 */

/**
 * @typedef { import("lib/types").Media } Media
 * @type { Media }
 */
const defaultImage = {
  name: 'Default Image',
  src: 'https://f.shgcdn.com/3e439e58-55b0-417d-8475-9b8db731b619/',
  width: 720,
  height: 480,
}

/* Number of slides shown */
const VISIBLE_SLIDES = {
  base: 1,
  sm: 2,
  md: 3,
  lg: 3,
}

/* Gap between slides (rem) */
const SLIDE_GAP = 1

/* Slide image size (rem) */
const SLIDE_SIZE = {
  base: 5,
  sm: 6,
  md: 7,
  lg: 7,
}

/**
 * @typedef {{
 *  media?: Media[]
 *  backIcon?: React.ReactElement
 *  forwardIcon?: React.ReactElement
 * }} CarouselProps
 * @param {CarouselProps} props
 * @returns
 */
const Carousel = props => {
  const iconSize = { base: '2rem', sm: '3rem', md: '4rem', lg: '4rem' }

  const {
    media = [],
    backIcon = <Icon icon="ChevronLeftIcon" w={iconSize} h={iconSize} />,
    forwardIcon = <Icon icon="ChevronRightIcon" w={iconSize} h={iconSize} />,
  } = props

  if (media.length === 0) {
    media.push(defaultImage)
  }

  const mediaLength = media.length
  const isSingleImage = mediaLength === 1

  /**
   * @typedef { import("@chakra-ui/react").Theme } Theme
   * @type { Theme }
   */
  const theme = useTheme()

  const [currentSlide, setCurrentSlide] = React.useState(0)
  /** @type { React.MutableRefObject<HTMLDivElement | null> } */
  const imageContainerRef = React.useRef(null)

  const goBack = React.useCallback(() => {
    setCurrentSlide(previous => (previous > 0 ? --previous : previous))
  }, [])

  const goForward = React.useCallback(() => {
    setCurrentSlide(previous => (previous < mediaLength - 1 ? ++previous : previous))
  }, [mediaLength])

  /**
   * @typedef { import('react-swipeable').SwipeCallback } SwipeCallback
   * @type { SwipeCallback }
   */
  const handleSwiping = React.useCallback(
    ({ deltaX }) => {
      if (
        !imageContainerRef.current ||
        (currentSlide === 0 && deltaX > 0) ||
        (currentSlide === mediaLength - 1 && deltaX < 0)
      ) {
        return
      }

      const { style } = imageContainerRef.current
      const scaleFactor = 10
      const scaledDeltaX = Math.round(deltaX / scaleFactor)
      const angle = Math.min(Math.abs(scaledDeltaX), 30)

      style.transformOrigin = deltaX > 0 ? 'bottom right' : 'bottom left'
      style.transform = deltaX > 0 ? `rotate(${angle}deg)` : `rotate(-${angle}deg)`
    },
    [currentSlide, mediaLength],
  )

  const resetImageAngle = React.useCallback(() => {
    if (!imageContainerRef.current) return
    imageContainerRef.current.style.transform = `rotate(0deg)`
  }, [])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goForward,
    onSwipedRight: goBack,
    onSwiping: handleSwiping,
  })

  React.useEffect(() => {
    resetImageAngle()
  }, [currentSlide, resetImageAngle])

  const { src, width = 2048, height = 2048 } = media[currentSlide]

  return (
    <Grid
      display="inline-grid"
      tabIndex={0}
      outline="none"
      templateAreas={`"preview preview preview" "back slider forward"`}
      rowGap={3}
      alignItems="center"
      justifyItems="center"
      maxW={{ base: '90vw', lg: '2xl' }}
      m={{ base: 'auto', lg: 'initial' }}
      px={5}
      onKeyDown={handleKeyDown}
    >
      <Container
        gridArea="preview"
        overflow="hidden"
        style={{ touchAction: 'pan-y' }}
        {...swipeHandlers}
        onTouchEnd={resetImageAngle}
      >
        <Fade key={src} in>
          <Container ref={imageContainerRef}>
            <Image
              src={src}
              alt=""
              htmlWidth={width.toString()}
              htmlHeight={height.toString()}
              sizes="(min-width: 768px) 50vw, 85vw"
              loading="eager"
            />
          </Container>
        </Fade>
      </Container>

      <Container gridArea="back" display={isSingleImage ? 'none' : 'block'} justifySelf="end">
        <IconButton
          aria-label="Go to the previous image"
          variant="icon"
          icon={backIcon}
          disabled={currentSlide === 0}
          onClick={goBack}
        />
      </Container>

      <Container
        gridArea="slider"
        display={isSingleImage ? 'none' : 'block'}
        position="relative"
        overflow="hidden"
        height={{
          base: `${SLIDE_SIZE.base}rem`,
          sm: `${SLIDE_SIZE.sm}rem`,
          md: `${SLIDE_SIZE.md}rem`,
          lg: `${SLIDE_SIZE.lg}rem`,
        }}
        width={{
          base: `${SLIDE_SIZE.base}rem`,
          sm: `${VISIBLE_SLIDES.sm * SLIDE_SIZE.sm + (VISIBLE_SLIDES.sm - 1) * SLIDE_GAP}rem`,
          md: `${VISIBLE_SLIDES.md * SLIDE_SIZE.md + (VISIBLE_SLIDES.md - 1) * SLIDE_GAP}rem`,
          lg: `${VISIBLE_SLIDES.lg * SLIDE_SIZE.lg + (VISIBLE_SLIDES.lg - 1) * SLIDE_GAP}rem`,
        }}
      >
        <HStack
          spacing={{ base: 0, sm: `${SLIDE_GAP}rem` }}
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          left={{
            base: calculateSliderPosition(VISIBLE_SLIDES.base, SLIDE_SIZE.base, 0),
            sm: calculateSliderPosition(VISIBLE_SLIDES.sm, SLIDE_SIZE.sm, SLIDE_GAP),
            md: calculateSliderPosition(VISIBLE_SLIDES.md, SLIDE_SIZE.md, SLIDE_GAP),
            lg: calculateSliderPosition(VISIBLE_SLIDES.lg, SLIDE_SIZE.lg, SLIDE_GAP),
          }}
          transition="left 0.4s linear"
        >
          {media.map(({ src }, index) => (
            <Container
              key={src}
              tabIndex={0}
              data-slide-index={index}
              opacity={index === currentSlide ? 1 : 0.5}
              width={{
                base: `${SLIDE_SIZE.base}rem`,
                sm: `${SLIDE_SIZE.sm}rem`,
                md: `${SLIDE_SIZE.md}rem`,
                lg: `${SLIDE_SIZE.lg}rem`,
              }}
              onClick={() => setCurrentSlide(index)}
              onFocus={() => setCurrentSlide(index)}
              cursor="pointer"
              _hover={{ opacity: 1 }}
            >
              <Image
                src={src}
                alt=""
                htmlHeight={(SLIDE_SIZE.lg * 16).toString()}
                htmlWidth={(SLIDE_SIZE.lg * 16).toString()}
                sizes={`(min-width: ${theme.breakpoints.lg}) ${SLIDE_SIZE.lg}rem, (min-width: ${theme.breakpoints.md}) ${SLIDE_SIZE.md}rem, (min-width: ${theme.breakpoints.sm}) ${SLIDE_SIZE.sm}rem, ${SLIDE_SIZE.base}rem`}
              />
            </Container>
          ))}
        </HStack>
      </Container>

      <Container gridArea="forward" display={isSingleImage ? 'none' : 'block'} justifySelf="start">
        <IconButton
          aria-label="Go to the next image"
          variant="icon"
          icon={forwardIcon}
          disabled={currentSlide === mediaLength - 1}
          onClick={goForward}
        />
      </Container>
    </Grid>
  )

  /**
   *
   * @param {number} visibleSlides
   * @param {number} imgSize
   * @param {number} gap
   * @returns
   */
  function calculateSliderPosition(visibleSlides, imgSize, gap) {
    const itemSize = imgSize + gap
    const maxFirstVisibleSlide = mediaLength - visibleSlides
    const firstVisibleSlide =
      currentSlide === 0 || visibleSlides < 3
        ? currentSlide
        : currentSlide - Math.floor(visibleSlides / 2)

    return firstVisibleSlide < maxFirstVisibleSlide
      ? `-${firstVisibleSlide * itemSize}rem`
      : `-${maxFirstVisibleSlide * itemSize}rem`
  }

  /**
   * @param {React.KeyboardEvent<HTMLDivElement>} event
   */
  function handleKeyDown(event) {
    const { key, target } = event

    switch (key) {
      case 'Enter':
        if (target.hasOwnProperty('getAttribute')) {
          const slideIndex = /** @type { Element } */ (target).getAttribute('data-slide-index')

          if (slideIndex !== null) {
            setCurrentSlide(Number(slideIndex))
          }
        }
        break

      case 'ArrowLeft':
        goBack()
        break

      case 'ArrowRight':
        goForward()
        break

      case 'Escape':
        setCurrentSlide(0)
        break

      // no default
    }
  }
}

export default Carousel

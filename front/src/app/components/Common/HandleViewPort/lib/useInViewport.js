// React hooks
import { useEffect, useRef, useState } from 'react'
import { findDOMNode } from 'react-dom'

const useInViewport = (target, options, config = { disconnectOnLeave: false }, props) => {
  const { onEnterViewport, onLeaveViewport, onTransitionViewport } = props
  const [, forceUpdate] = useState()
  const [, forceUpdateB] = useState()
  const [, forceUpdateL] = useState()

  const observer = useRef()

  const inViewportRef = useRef(false)
  const inBetweenRef = useRef(false)
  const inLeftRef = useRef(false)
  const intersected = useRef(false)

  const enterCountRef = useRef(0)
  const leaveCountRef = useRef(0)

  useEffect(() => {
    function startObserver() {
      if (target.current && observer.current) {
        // eslint-disable-next-line react/no-find-dom-node
        const node = findDOMNode(target.current)
        if (node) {
          observer.current.observe(node)
        }
      }
    }
    function stopObserver() {
      if (target.current && observer.current) {
        // eslint-disable-next-line react/no-find-dom-node
        const node = findDOMNode(target.current)
        if (node) {
          observer.current.unobserve(node)
          observer.current.disconnect()
          observer.current = null
        }
      }
    }
    function handleIntersection(entries) {
      const entry = entries[0] || {}

      const { isIntersecting, intersectionRatio } = entry
      // console.info('---intersectionRatio: ', isIntersecting, intersectionRatio)
      const isInViewport = typeof isIntersecting !== 'undefined' && intersectionRatio > 0.50
      let isInBetween = typeof isIntersecting !== 'undefined' && intersectionRatio > 0.2 && intersectionRatio < 0.50
      let isLeftViewPort = typeof isIntersecting !== 'undefined' && !isIntersecting ? true : false

      inBetweenRef.current = isInBetween
      forceUpdateB(isInBetween)

      inLeftRef.current = isLeftViewPort
      forceUpdateL(isLeftViewPort)

      if (!intersected.current && isInViewport) {
        intersected.current = true
        // enter
        // console.info('---i isInViewport: ', isInViewport, intersectionRatio)
        onEnterViewport && onEnterViewport()
        enterCountRef.current += 1
        inViewportRef.current = isInViewport
        inBetweenRef.current = isInBetween
        forceUpdate(isInViewport)
        forceUpdateB(isInBetween)
        inLeftRef.current = isLeftViewPort
        forceUpdateL(isLeftViewPort)
        return
      }

      // leave
      if (intersected.current && !isInViewport) {
        intersected.current = false
        onLeaveViewport && onLeaveViewport()
        if (config.disconnectOnLeave && observer.current) {
          // disconnect obsever on leave
          observer.current.disconnect()
        }
        leaveCountRef.current += 1
        inViewportRef.current = isInViewport
        inBetweenRef.current = isInBetween
        forceUpdate(isInViewport)
        forceUpdateB(isInBetween)
        inLeftRef.current = isLeftViewPort
        forceUpdateL(isLeftViewPort)
      }
    }
    function initIntersectionObserver() {
      if (!observer.current) {
        // $FlowFixMe
        observer.current = new IntersectionObserver(handleIntersection, options)
      }
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    initIntersectionObserver()
    startObserver()

    return () => {
      stopObserver()
    }
  }, [target, options, config, onEnterViewport, onLeaveViewport, onTransitionViewport])

  return {
    inViewport: inViewportRef.current,
    inBetween: inBetweenRef.current,
    enterCount: enterCountRef.current,
    leaveCount: leaveCountRef.current,
    isLeftViewPort: inLeftRef.current,
  }
}

export default useInViewport

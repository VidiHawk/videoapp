// HOC for handleViewport
import React, { useRef, forwardRef } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import useInViewport from './useInViewport'

const noop = () => {}

const isFunctionalComponent = (Component) => {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.render)
}

const isReactComponent = (Component) => {
  return Component.prototype && Component.prototype.isReactComponent
}

function handleViewport(TargetComponent, options, config = { disconnectOnLeave: false }) {
  // eslint-disable-next-line react/display-name
  const ForwardedRefComponent = forwardRef((props, ref) => {
    const refProps = {
      forwardedRef: ref,
      // pass both ref/forwardedRef for class component for backward competiblity
      ...(isReactComponent(TargetComponent) && !isFunctionalComponent(TargetComponent)
        ? {
            ref,
          }
        : {}),
    }
    return <TargetComponent {...props} {...refProps} />
  })

  const InViewport = ({
    onEnterViewport = noop,
    onLeaveViewport = noop,
    onTransitionViewport = noop,
    ...restProps
  }) => {
    const node = useRef()
    const { inViewport, enterCount, leaveCount, inBetween, isLeftViewPort } = useInViewport(node, options, config, {
      onEnterViewport,
      onLeaveViewport,
      onTransitionViewport,
    })

    return (
      <ForwardedRefComponent
        {...restProps}
        inViewport={inViewport}
        inBetween={inBetween}
        enterCount={enterCount}
        leaveCount={leaveCount}
        isLeftViewPort={isLeftViewPort}
        ref={node}
      />
    )
  }

  const name = TargetComponent.displayName || TargetComponent.name || 'Component'
  InViewport.displayName = `handleViewport(${name})`

  return hoistNonReactStatic(InViewport, ForwardedRefComponent)
}

export default handleViewport

import React from 'react'

const AboutThisApp = (props) => {
  const { forwardedRef, inViewport } = props
  return (
    <div className='settings-container-section' ref={forwardedRef} id={props.id}>
      <div className='container-terms'>
      <div className="settings-title-container">ABOUT THIS APP</div>
        <div className='settings-desc-container mt-3'>
          <div>This video app was developed by Vidi Rendering Technologies.</div>
          <br />
          <div>Website: <a target={'_blank'} href={'https://vidiren.com'}>www.vidiren.com</a></div>
          <br />
          <div>
            Email: <a href='mailto:info@vidiren.com'>info@vidiren.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutThisApp

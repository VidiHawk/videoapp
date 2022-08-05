import React from 'react'
import handleViewport from './../Common/HandleViewPort'

const CopyrightPolicy = (props) => {
  const { forwardedRef, inViewport } = props
  return (
    <div className="settings-container-section" ref={forwardedRef} id={props.id}>
      <div className="container-terms">
        <div className="settings-title-container">COPYRIGHT</div>
        <div className="settings-desc-container">
          All design, text, graphics, logos, button icons, images, audio and video clips, the selection and arrangement
          thereof, and all software on the Sites is Copyright © EMK® ALL RIGHTS RESERVED. The compilation (meaning the
          collection, arrangement and assembly) of all content on the Sites is the exclusive property of EMK and
          protected by U.S. and international copyright laws. All software used on the Sites is the property of EMK or
          its software suppliers and is protected by U.S. and international copyright laws. Permission is granted to
          electronically copy and to print in hard copy portions of the Sites for the sole purpose of placing an order
          with EMK. Any other use of materials on the Sites - including reproduction for purposes other than those
          permitted above, modification, distribution, republishing, transmission, display or performance - without the
          prior written permission of EMK is strictly prohibited.
        </div>
      </div>
    </div>
  )
}

export default CopyrightPolicy;

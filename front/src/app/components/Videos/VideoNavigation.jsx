import React from 'react';
import ArrowUp from '../../../../public/images/navigation_top.svg';


const VideoNavigation = (props) =>{

  return (
    <div className={`navigation-arrow`}>
      <div className={`navigation-arrow_icon navigation-arrow_top ${props.top ? '' : 'disabled'}`} onClick={() => props.upArrowClicked()}>
        <ArrowUp/>
      </div>
      <div className={`navigation-arrow_icon navigation-arrow_bottom ${props.bottom? '' : 'disabled'}`} onClick={() => props.downArrowClicked()}>
        <ArrowUp/>
      </div>
      <div className={`navigation-arrow_icon navigation-arrow_right ${props.right ? '' : 'disabled'}`} onClick={() => props.rightArrowClicked()}>
        <ArrowUp/>
      </div>
      <div className={`navigation-arrow_icon navigation-arrow_left ${props.left ? '' : 'disabled'}`} onClick={() => props.leftArrowClicked()}>
        <ArrowUp/>
      </div>
    </div>
  )
}

export default VideoNavigation;

import React from 'react'
import { Progress } from 'antd'
import EMKLogo from './EMK_Vector_Logo_floral_on_top_0_33x.svg'

export const MainLoader = (props) => {
  const { setMainLoader, theme } = props
  const [percent, setPercent] = React.useState(0)

  React.useEffect(() => {
    if (percent <= 100) {
      let interval = setInterval(() => {
        setPercent(percent + 1)
      }, 10)
      if (percent === 100) {
        setMainLoader(true)
      }
      return () => {
        clearInterval(interval)
      }
    }
  }, [percent, setMainLoader])

  return (
    <div className={`luxe-init-loading luxe-init-loading-${theme}`}>
      <div className="luxe-init-loading-wrapper">
        <EMKLogo />
        <div className="luxe-init-loading__title">VIDEO STORE</div>
        <Progress percent={percent} showInfo={false} strokeColor={{ '0%': '#5e97b6', '100%': '#5e97b6' }} />
      </div>
    </div>
  )
}

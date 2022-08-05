import React from 'react'
import { Button } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

export const DownloadButton = (props) => {
  const { onClick } = props
  return (
    <Button className="download-btn" onClick={onClick} icon={<CloudDownloadOutlined />}>
      {props.children}
    </Button>
  )
}

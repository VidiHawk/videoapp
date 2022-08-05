import React, { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from './../../../helpers/authContext'
import CameraRotateBlack from './../../../../../public/images/camera_rotate_black.svg'
import DeleteReview from './../../../../../public/images/delete-recorded-review.svg'
import UploadReview from './../../../../../public/images/upload-review.svg'

const Camera = ({ uploadRecording, setPreviewVisible, cameraLoading, isMobile }) => {
  const context = useContext(AuthContext)
  const [stream, setStream] = useState(null)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [totalCameras, setTotalCameras] = useState(0)
  const [cameraMode, setCameraMode] = useState(true)
  const [status, setStatus] = useState(false)
  const [seconds, setSeconds] = useState(60)
  const [angle, setAngle] = useState(360)
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [uploading, setUploading] = useState(false)
  const videoViewer = useRef()

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        if (seconds >= 1) {
          setSeconds(seconds - 1)
          setAngle((seconds - 1) * 6)
        }
      }, 1000)
    }
  }, [seconds, status])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    capture()
  }, [])

  useEffect(() => {
    if (stream) {
      videoViewer.current.pause()
      videoViewer.current.srcObject = null

      stream.getTracks().forEach((t) => {
        t.stop()
      })
      capture()
    }
  }, [cameraMode])

  const capture = async () => {
    try {
      if (navigator && navigator.mediaDevices) {
        let devices = await navigator.mediaDevices.enumerateDevices()
        let mode = cameraMode ? 'user' : 'environment'
        let cameras = devices.filter((v) => v.kind === 'videoinput').length
        if (window.orientation !== 0) setTotalCameras(2)
        else setTotalCameras(cameras)
        if (cameras <= 1) mode = 'user'

        let constraints = {
          audio: true,
          video: {
            width: window.innerWidth,
            height: window.innerHeight,
            facingMode: {
              exact: mode,
            },
          },
        }

        if(isMobile) {
          constraints.video.width = window.innerHeight
          constraints.video.height = window.innerWidth
        }

        if(typeof InstallTrigger !== 'undefined' && !isMobile) {
          setTotalCameras(1)
          delete constraints.video.facingMode
        }

        navigator.mediaDevices.getUserMedia(constraints)
        .then((_stream) => {
          try {
            setMediaRecorder(new MediaRecorder(_stream))
            videoViewer.current.srcObject = _stream
            videoViewer.current.load()
            videoViewer.current.play()
            setStream(_stream)
          } catch(err) {
            context.showToastMessage({
              message: `Recording only available for iOS 14 and above. Please upgrade your OS or enable Media Recorder experimantal feature fom settings.`,
              type: `error`
            })
            // alert("Error: " + err.message)
          }
        })
        .catch(function(err) {
          console.log('The following error occurred: ' + err)
          context.showToastMessage({
            message: `Video recording is not supported on this browser.`,
            type: `error`
          })
        })
    
      } else {
        console.log('Broswer not support. Navigator.')
        context.showToastMessage({
          message: `Video recording is not supported on this browser.`,
          type: `error`
        })
      }
    } catch(err) {
      alert(err)
    }
  }

  const statrRecording = () => {
    mediaRecorder.start()
    let chunks = []
    mediaRecorder.ondataavailable = e => chunks.push(e.data)

    mediaRecorder.onstop = () => {
      videoViewer.current.pause()
      videoViewer.current.srcObject = null

      const blob = new Blob(chunks, { 'type' : chunks[0].type })
      chunks = []
      const video = window.URL.createObjectURL(blob)
      setRecordedVideo(blob)

      videoViewer.current.src = video
      videoViewer.current.load()
      videoViewer.current.play()

      setPreviewVisible(true)
    }

    setStatus(true)
  }

  const stopRecording = () => {
    mediaRecorder.stop()
    setStatus(false)
  }

  const deleteRecording = (startAgain = true) => {
    setSeconds(60)
    setStatus(false)
    setAngle(360)
    setRecordedVideo(null)
    setPreviewVisible(false)
    setUploading(false)

    if(startAgain) capture()
  }

  let flipVideo = {}
  if(cameraMode) flipVideo = {
    transform: 'scale(-1, 1)',
    transformOrigin: '50% 50%'
  }

  return (
    <div className='my-review-camera'>
      <div>
        <video style={{
          height: windowHeight,
          width: windowWidth,
          ...flipVideo
        }} ref={videoViewer} playsInline autoPlay loop muted></video>
      </div>

      <div className='review-recording-container'>

        { cameraLoading && <div className='review-recording-container__loading'>Uploading Review...</div> }
        
        { !recordedVideo && <div>
          <div onClick={ status ? stopRecording : statrRecording } className='seconds-counter'>{seconds}</div>
          <div onClick={ status ? stopRecording : statrRecording } className='circle' style={{
            background: `conic-gradient(
              red ${angle}deg, transparent calc(${angle}deg + 0.5deg) 100%)`
          }}>
            <div className='arc'></div>
          </div>
        </div> }
        { !recordedVideo && totalCameras > 1 ? <div className='camera-rotate' onClick={() => setCameraMode(!cameraMode)}>
          <CameraRotateBlack />
        </div> : null }

        { (recordedVideo && !cameraLoading) && <div>
          <div className='delete-review' onClick={deleteRecording}>
            <DeleteReview />
          </div>
          <div className='upload-review' onClick={() => {
            uploadRecording(recordedVideo, deleteRecording)
          }}>
            <UploadReview />
          </div>
        </div> }
      </div>
    </div>
  )
}

export default Camera
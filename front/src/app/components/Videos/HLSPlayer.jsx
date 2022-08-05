import React, { createRef } from 'react'
import { Log, Player, Utils } from 'clappr'
import { Button } from 'antd'
import PlayIcon from './../../../../public/images/play.svg'
import ClapprPlayIcon from './../../../../public/images/clappr-poster-play.svg'
import VolumeMute from './../../../../public/images/volume_mute_white.svg'
import VolumeOn from './../../../../public/images/volume_on_white.svg'
import PauseIcon from './../../../../public/images/pause.svg'
import ForwardIcon from './../../../../public/images/forward.svg'
import RewindIcon from './../../../../public/images/rewind.svg'
import SubtitleIcon from './../../../../public/images/subtitles.svg'
import AuthContext from './../../helpers/authContext'
import { LuxeSpin } from '../Elements'
import { VideoJSONLD } from '../../helpers/richsnippet'
import HlsjsPlayback from '@clappr/hlsjs-playback'
// import { renderToString } from 'react-dom/server'
import { isIOS, isMobile } from 'react-device-detect'
import config from '../../../config'

Log.setLevel(1)
Utils.SvgIcons.play = ''

// renderToString(<ClapprPlayIcon />)

class HLSPlayer extends React.Component {
  static contextType = AuthContext
  state = {
    isLoaded: false,
    isPlaying: false,
    showControls: false,
    currentTime: 0,
    duration: 0,
    isMoved: false, // if progress bar is in drag mode
    bufferingDetected: false,
    lastPlayPos: 0,
    currentPlayPos: 0,
    cues: '',
    isPlayedOnce: false
  }

  playerSource = {
    // hls: 'https://storage.googleapis.com/jovanni-test-bucket/Bioplacenta-Secret/playlist.m3u8',
    hls: config.CDN_BUCKET_URL + this.props.video.hls_public_url,
    poster: config.CDN_BUCKET_URL + this.props.video.poster,
    caption: config.CDN_BUCKET_URL + this.props.video.captionUrl
  }

  constructor(props) {
    super(props)
    this.playerDiv = createRef(null)
    this.player = createRef(null)
    this.progressRef = createRef(null)
    this.progressCircleNode = createRef(null)
    this.progressRefLoaded = createRef(null)
    this.progressHoverRef = createRef(null)
    this.progressParentRef = createRef(null)
    this.currentVideoTagRef = createRef(null)
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.videoId !== this.props.videoId) {
      this.setupPlayer(this.playerSource)
    }
    return true
  }

  componentDidMount() {
    //1. Setup the player
    if (this.playerDiv.current) {
      this.setupPlayer(this.playerSource)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //If the video in between swipes, just pause it
    if (this.props.inBetween) {
      this.pauseVideo()
    }
    //play it...
    if (this.props.inViewport !== prevProps.inViewport
      || this.state.isLoaded !== prevState.isLoaded
      || this.props.navigationPanel !== prevProps.navigationPanel) {

      //If the video in viewport/ play
      if (this.props.inViewport) {
        if (this.state.isLoaded) {
          this.playVideo()
          if (!this.context.isVideoPermitted || this.props.navigationPanel) {
            this.pauseVideo()
          }
        }
      } else {
        this.playVideo()
        this.pauseVideo()
      }

    }

    if (this.state.showControls !== prevState.showControls) {
      this.state.showControls ? this.startProgressBar() : this.stopProgressBar()
    }

    if (this.props.isLeftViewPort !== prevProps.isLeftViewPort && !this.props.navigationPanel) {
      if (this.props.isLeftViewPort) {
        this.pauseVideo()
        this.restartVideo()
      } else if (!this.props.isDefaultVideo && !this.context.isVideoPermitted) { //Video should not start automatically on first load
        this.switchSound()
        this.context.setIsVideoPermitted(true)
      }
      this.setState({ showControls: false })
    }

    if (this.context.isVideoPermitted) {
      if (this.props.bagOpenFor !== 0 && this.props.inViewport) {
        this.context.isCartPopup ? this.pauseVideo() : this.playVideo()
      }
      if (this.props.bagOpenFor !== prevProps.bagOpenFor) {
        this.setState({ showControls: false })
      }
    }
  }

  componentWillUnmount() {
    this.destroyPlayer()
  }

  setupPlayer = (source) => {
    if (this.player.current) {
      this.destroyPlayer()
    }
    this.player.current = new Player({
      parent: this.playerDiv.current,
      source: source.hls,
      loop: true,
      // poster: source.poster,
      width: '100%',
      height: '100%',
      chromeless: true,
      hlsMinimumDvrSize: 60,
      hlsRecoverAttempts: 16,
      playback: {
        playInline: true,
        crossOrigin: 'anonymous',
        externalTracks: [
          {
            lang: 'en-US',
            label: 'Inglês',
            src: source.caption,
            kind: 'subtitles'
          }
        ],
        hlsjsConfig: {
          enableWorker: true,
          maxBufferSize: 1,
          maxBufferLength: 5,
          manifestLoadingTimeOut: 20000,
          manifestLoadingMaxRetry: 3
        }
      },
      plugins: [HlsjsPlayback],
      events: {
        onReady: () => {
          this.setState({ isLoaded: true })
          const parentElement = document.getElementById(this.props.video.id)
          this.currentVideoTagRef = parentElement.querySelector('video')
          for (let index = 0; index < this.currentVideoTagRef.textTracks.length; index++) {
            this.currentVideoTagRef.textTracks[index].mode = 'hidden'
          }
          this.currentVideoTagRef.textTracks[0].addEventListener('cuechange', this.setCueValue)
        },
        onPlay: () => {
          this.setState({
            duration: this.player.current.getDuration(),
            isPlaying: true
          })
        },
        onPause: () => {
          this.setState({ isPlaying: false })
        },
        onError: () => {
          console.log('onError Error: ', this.player.current)
        }
      }
    })
    //To Remove the play icon and load the video in advance
  }

  destroyPlayer() {
    if (this.player.current) {
      this.player.current.destroy()
    }
    this.player.current = null
    if (this.currentVideoTagRef && this.currentVideoTagRef.textTracks && this.currentVideoTagRef.textTracks.length)
      this.currentVideoTagRef.textTracks[0].removeEventListener('cuechange', this.setCueValue)
  }

  setCueValue = (event) => {
    if (event.target.activeCues.length && event.target.activeCues[0]) {
      this.setState({ cues: event.target.activeCues[0].text })
    } else {
      this.setState({ cues: '' })
    }
  }

  startProgressBar = () => {
    let progressBarInterval = setInterval(this.progressTheBar, 100)
    this.setState({ progressBarInterval: progressBarInterval })
  }

  stopProgressBar = () => {
    clearInterval(this.state.progressBarInterval)
    this.setState({ currentTime: 0 })
  }

  progressTheBar = () => {
    if (!this.state.isMoved && this.player.current) {
      this.setProgressBar(this.player.current.getCurrentTime())
      this.setState({ currentTime: this.player.current.getCurrentTime() })
    }
  }

  //ProgressBar
  setProgressBar = (currentTime) => {
    if (currentTime) {
      const prValue = (currentTime / this.state.duration) * 100
      this.progressRef.current.style.transform = `scaleX(${prValue / 100})`
      let pos = (this.progressRef.current.clientWidth / 100) * (prValue - 1)
      this.progressCircleNode.current.style.transform = `translateX(${pos}px)`
    }
  }

  onSubtitle = () => {
    this.context.toggleShowSubTitle()
  }

  onRewind = () => {
    let currentTime = this.player.current.getCurrentTime()
    if (currentTime > 10) {
      this.setState({ currentTime: currentTime - 10 })
    }
    this.player.current.seek(currentTime - 10)
  }

  onForward = () => {
    let currentTime = this.player.current.getCurrentTime()
    if (currentTime < this.player.current.getDuration() - 10) {
      this.setState({ currentTime: currentTime + 10 })
    }
    this.player.current.seek(currentTime + 10)
  }

  switchChange = () => {
    if (this.state.isPlaying) {
      this.pauseVideo()
    } else {
      this.playVideo()
    }
  }

  restartVideo = () => {
    this.setState({ currentTime: 0 })
    this.player.current && this.player.current.seek(0)
    this.progressRef.current.value = 0
    let pos = Math.round(0)
    this.progressRef.current.style.transform = `scaleX(${pos})`
    this.progressCircleNode.current.style.transform = `translateX(${pos}px)`
  }

  pauseVideo = () => {
    this.player.current.pause()
  }

  playVideo = () => {
    if (!this.player.current) return

    //Play the sound
    const { globalSound } = this.context
    if (globalSound) {
      this.player.current.unmute()
      this.player.current.setVolume(100)
    } else {
      this.player.current.mute()
      this.player.current.setVolume(0)
    }
    this.player.current.play()
  }

  switchSound = () => {
    const { globalSound, setGlobalSound } = this.context
    if (globalSound) {
      this.player.current.mute()
      this.player.current.setVolume(0)
    } else {
      this.player.current.unmute()
      this.player.current.setVolume(100)
    }
    setGlobalSound(!globalSound)
  }

  secToMinutesAndSeconds = (sec) => {
    // alert(sec)
    let minutes = Math.floor(sec / 60)
    let seconds = Math.floor(sec % 60)
    if (seconds < 10) seconds = '0' + seconds
    // if (minutes < 10) minutes = '0' + minutes
    return minutes + ':' + seconds
  }

  //Seeking through media
  onSeek = (seekToTime) => {
    this.player.current.seek(seekToTime)
    this.setState({ currentTime: seekToTime })
  }

  onMouseEnterControl = (e) => {
    if (!isMobile) {
      this.props.preventSlideScroll('enter')
    }
  }
  
  onTouchStartControl = (e) => {
    this.props.preventSlideScroll('enter');
  }

  onMouseLeaveControl = () => {
    this.props.preventSlideScroll('leave')
  }

  onMouseEnterProgress = (e) => {
    let xFinal = this.getMousePosition(e).xFinal

    if (xFinal < 0) xFinal = 0
    if (xFinal > 1) xFinal = 1

    this.progressHoverRef.current.style.transform = `scaleX(${xFinal})`
  }

  getMousePosition = (e) => {
    let xPox
    if (e.type === 'touchstart' || e.type === 'touchmove') {
      xPox = e.touches[0].clientX
    } else if (e.type === 'touchend') {
      xPox = e.changedTouches[0].clientX
    } else {
      xPox = e.clientX
    }
    let offsetLeft = this.progressHoverRef.current.getBoundingClientRect().left
    let barWidth = this.progressParentRef.current.clientWidth

    let mousePosWithOffset = xPox - offsetLeft + 1

    //Convert
    let xFinal = mousePosWithOffset / barWidth // percent of bar

    return { xFinal, mousePosWithOffset }
  }

  onMouseMove = (e) => {
    let xFinalMove = this.getMousePosition(e).xFinal
    let xPx = this.getMousePosition(e).mousePosWithOffset

    if (!(xFinalMove < 0 || xFinalMove > 1)) {
      this.progressRef.current.style.transform = `scaleX(${xFinalMove})`
      this.progressCircleNode.current.style.transform = `translateX(${xPx}px)`
    }
  }

  onMouseDownProgress = (e) => {
    // let xFinal = this.getMousePosition(e).xFinal
    this.setState({ isMoved: true })

    this.progressParentRef.current.addEventListener('mousemove', this.onMouseMove, { passive: true })
    this.progressParentRef.current.addEventListener('touchmove', this.onMouseMove, { passive: true })

    if (e.type === 'mouseup' || e.type === 'touchend') {
      //calculation of the seconds clicked
      let xFinal = this.getMousePosition(e).xFinal

      let calc = xFinal * this.state.duration

      let calc_fix = Math.round(calc)

      // let time = con
      this.progressParentRef.current.removeEventListener('mousemove', this.onMouseMove, { passive: true })
      this.progressParentRef.current.removeEventListener('touchmove', this.onMouseMove, { passive: true })
      this.onSeek(calc_fix)
      this.setState({ isMoved: false })
    }
  }

  manageControls = () => {
    // if already clicked on bag or comment icon -- do not proceed with video control logic
    if (this.props.bagOpenFor === 0 && this.props.commentOpenFor === 0) {
      if (this.state.isPlaying) {
        this.setState({ showControls: !this.state.showControls })
      } else if (!this.context.isVideoPermitted) {
        this.playVideo()
        this.switchSound()
        this.context.setIsVideoPermitted(true)
      } else if (!this.state.isPlayedOnce) {
        this.playVideo()
      } else {
        this.setState({ showControls: !this.state.showControls })
      }
      this.setState({ isPlayedOnce: true })
    }
  }

  volumOnOffByUser = () => {
    this.switchSound()
    if (this.context.globalSound) {
      // When a user manually mutes a video, captions should automatically turn on
      this.context.setShowSubTitle(true)
    } else {
      // When a user unmutes a video, captions should automatically turn off
      this.context.setShowSubTitle(false)
    }
  }

  render() {
    const { globalSound } = this.context
    const showControlsClass = this.state.showControls ? (this.context.isLoginPopup ? '' : 'cstm-video-controls--show') : ''
    const navPanelOpenClass = this.props.navigationPanel ? 'cstm-video-controls--navOpen' : ''
    const classNavOpen = this.props.navigationPanel ? 'video-wrapper--navOpen' : ''
    let cuesClass = this.context.showSubTitles ? 'custom-caption custom-caption--show' : 'custom-caption'

    cuesClass = this.context.showSubTitles && this.state.showControls ? 'custom-caption custom-caption--show custom-caption--position' : cuesClass
    let subtitleIconCLass = !this.context.showSubTitles ? 'cstm-icons cstm-icons--sb' : 'cstm-icons cstm-icons--sb cstm-icons--active'
    const playIconForAppleDevices = isIOS && this.props.inViewport && !this.state.isPlayedOnce && this.context.globalSound && !this.state.isPlaying
    const shouldDisplayPlayIcon = !this.context.isVideoPermitted || playIconForAppleDevices
    return (
      <>
        <VideoJSONLD video={this.props.video} />

        {!this.state.isLoaded && (
          <div className='luxe-loading-container'>
            <LuxeSpin />
          </div>
        )}
        <figure className='cstm-video-component' ref={this.videoParentRef}>
          <div
            className={`video-wrapper ${classNavOpen}`}
            onClick={this.manageControls}
            onKeyPress={this.manageControls}
            role='button'
            tabIndex='0'
          >
            {shouldDisplayPlayIcon && (<div data-poster='' className={`player-poster custom-play-icon`}
                                            style={{ backgroundImage: `url(${this.playerSource.poster})` }}>
                <div className={`play-wrapper`} data-poster=''>
                  <ClapprPlayIcon />
                </div>
              </div>
            )}
            <div id={this.props.video.id} ref={this.playerDiv} className='full-height' />
          </div>
          {this.state.cues && <div className={cuesClass}>
              <span className='caption-text'>
                {this.state.cues}
              </span>
          </div>}
        </figure>
        <figcaption
          className={`cstm-video-controls ${showControlsClass} ${navPanelOpenClass}`}
          onMouseEnter={this.onMouseEnterControl}
          onMouseLeave={this.onMouseLeaveControl}
          onTouchStart={this.onTouchStartControl}
          onTouchEnd={this.onMouseLeaveControl}
        >
          <div className='cstm-video-wrapper'>
            <div className='cstm-video-icons'>
              <Button
                className='cstm-icons cstm-icons--pb'
                onClick={this.volumOnOffByUser}
                icon={globalSound ? <VolumeOn /> : <VolumeMute />}
              />
              <div>
                <Button className='cstm-icons cstm-icons--pb' onClick={this.onRewind} icon={<RewindIcon />} />
                <Button
                  className='cstm-icons cstm-icons--pb'
                  onClick={this.switchChange}
                  icon={this.state.isPlaying ? <PauseIcon /> : <PlayIcon />}
                />
                <Button className='cstm-icons cstm-icons--pb' onClick={this.onForward} icon={<ForwardIcon />} />
              </div>
              <button className={subtitleIconCLass} onClick={this.onSubtitle}>
                {<SubtitleIcon />}
              </button>
            </div>
            <div className='cstm-video-label-progress'>
              <label className='cstm-label-progress' htmlFor='progress'>
                {/* {this.state.currentTime} */}
                {this.secToMinutesAndSeconds(this.state.currentTime)}
              </label>

              <div className='luxe-progressBar'
                   onMouseDown={this.onMouseDownProgress}
                   onTouchStart={this.onMouseDownProgress}
                   onTouchEnd={this.onMouseDownProgress}
                   onMouseUp={this.onMouseDownProgress}
                   onMouseMove={this.onMouseEnterProgress}
                   ref={this.progressParentRef}
                   onKeyPress={this.onMouseDownProgress}
                   role='button'
                   tabIndex='0'>

                <div className='progress' id='progress' ref={this.progressRef} />
                <div className='progress-loaded' ref={this.progressRefLoaded} />
                <div className='progress-circle' ref={this.progressCircleNode} />
                <div className='progress-hover' ref={this.progressHoverRef} />
                <div className='progress-bar' />
              </div>
              <label className='cstm-label-progress'>{this.secToMinutesAndSeconds(this.state.duration)}</label>
            </div>
            {/* <div> */}
          </div>
        </figcaption>
      </>
    )
  }
}

export default HLSPlayer

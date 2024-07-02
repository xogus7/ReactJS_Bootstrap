import React, { useState, useRef, useEffect } from "react";
import { Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { sliderValueToVideoTime } from "../../utils/utils";

import useDeviceType from '../../hooks/useDeviceType';
import DeviceLayout from "../../components/DeviceLayout";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export const VideoEditorContext = React.createContext();
const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const device = useDeviceType();
  const $videoPlayerDiv = document.querySelector(".video_player")
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [currentVideoValue, setCurrentVideoValue] = useState(0);
  const [hasAudio, setHasAudio] = useState(false);
  const [done, setDone] = useState(false);
  const regex = /^\s+Stream.+Audio/

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  if (!done)
  ffmpeg.setLogger(({ message }) => {
    if(message.match(regex)) setHasAudio(true);
    if(message === "FFMPEG_END") setDone(true);
 });

  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
    }
  }, [videoFile])
  
  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const currTime = (videoPlayerState.duration * currentVideoValue) / 100;
      !isPlaying() && videoPlayer.seek(currTime);
  }
  }, [currentVideoValue])


  useEffect(() => {
    const [min, max] = sliderValues;
    if (min !== undefined && videoPlayerState && videoPlayer){
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);
      if (videoPlayerState.currentTime < minTime ) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime ) {
        videoPlayer.seek(maxTime);
      }
    }
  }, [sliderValues])


  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      const [min, max] = sliderValues;
      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);
      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState])

  if (!ffmpegLoaded) return <div>load</div>;

  const isPlaying = () => {
    return $videoPlayerDiv.firstElementChild.classList.toString().includes("playing");
  }

  return (
    <VideoEditorContext.Provider
      value={{
        device,
        sliderValues, setSliderValues,
        currentVideoValue, setCurrentVideoValue,
        videoFile, setVideoFile,
        videoPlayerState, setVideoPlayerState,
        videoPlayer, setVideoPlayer,
        processing, setProcessing,
        showSuccess, setShowSuccess,
        showFail, setShowFail,
        hasAudio, setHasAudio,
        ffmpeg
      }}
    >
      <Header />
      <DeviceLayout />
      <ToastContainer className="p-3" position={'top-center'} style={{ zIndex: 1 }}>
        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={2000} bg="dark" autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
        </Toast>
        <Toast onClose={() => setShowFail(false)} show={showFail} delay={2000} bg="dark" autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기를 실패했습니다.</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={processing}
        onHide={() => setProcessing(false)}
        backdrop={false}
        keyboard={false}
        centered
        size="sm"
      >
        <div className="loading_container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>내보내기가 진행중입니다.</p>
        </div>
      </Modal>
      {device !== 'mobile' && <Footer />}
    </VideoEditorContext.Provider>

  );
};

export default VideoEditor;

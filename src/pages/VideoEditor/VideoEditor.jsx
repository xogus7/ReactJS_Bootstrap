import React, { useState, useRef, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import styles from "./VideoEditor.module.css";

import video_placeholder from "../../assets/images/editor/video_placeholder.png";
import VideoPlayer from "../../components/VideoPlayer";
import MultiRangeSlider from "../../components/MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";

import useDeviceType from '../../hooks/useDeviceType';
import DeviceLayout from "../../components/DeviceLayout";
const ffmpeg = createFFmpeg({ log: true });

export const VideoEditorContext = React.createContext();

const VideoEditor = () => {
  const device = useDeviceType();

  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 100]);
  const [videoFile, setVideoFile] = useState();
  const [videoPlayerState, setVideoPlayerState] = useState();
  const [videoPlayer, setVideoPlayer] = useState();
  const [processing, setProcessing] = useState(false);
  const [show, setShow] = useState(false);


  useEffect(() => {
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!videoFile) {
      setVideoPlayerState(undefined);
    }
  }, [videoFile])


  useEffect(() => {
    const min = sliderValues[0]
    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
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

  return (
    <VideoEditorContext.Provider
      value={{
        device,
        sliderValues, setSliderValues,
        videoFile, setVideoFile,
        videoPlayerState, setVideoPlayerState,
        videoPlayer, setVideoPlayer,
        processing, setProcessing,
        show, setShow,
        ffmpeg
      }}
    >
      <DeviceLayout />
      <ToastContainer className="p-3" position={'top-center'} style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} bg="dark" autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>내보내기가 완료되었습니다.</Toast.Body>
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
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>

          <p style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: '#c8c8c8' }}>
            내보내기가 진행중입니다.
          </p>
        </div>
      </Modal>
    </VideoEditorContext.Provider>

  );
};

export default VideoEditor;

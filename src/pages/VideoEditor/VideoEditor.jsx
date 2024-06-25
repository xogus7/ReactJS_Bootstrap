import React, { useState, useRef, useEffect } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";
import styles from "./VideoEditor.module.css";

import video_placeholder from "../../assets/images/editor/video_placeholder.png";
import VideoPlayer from "./VideoPlayer";
import MultiRangeSlider from "../../components/MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import { sliderValueToVideoTime } from "../../utils/utils";

import useDeviceType from '../../hooks/useDeviceType';
const ffmpeg = createFFmpeg({ log: true });

const VideoEditor = () => {
  const device = useDeviceType();
  const uploadFile = useRef("");
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
    <>
      {
        device === 'mobile' ? (
          <article className="layout" style={{ padding: "56px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h1 className={styles.title}>Video Edit</h1>
              {videoFile && (
                <div>
                  <input onChange={(e) => setVideoFile(e.target.files[0])}
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    ref={uploadFile}
                  />
                  <Button
                    onClick={() => uploadFile.current.click()}
                    className={styles.re__upload__btn}
                    style={{ width: "fit-content" }}
                  >
                    비디오 재선택
                  </Button>
                </div>
              )}
            </div>
            <section>
              {
                videoFile ? (
                  <VideoPlayer
                    src={videoFile}
                    onPlayerChange={(videoPlayer) => {
                      setVideoPlayer(videoPlayer)
                    }}
                    onChange={(videoPlayerState) => {
                      setVideoPlayerState(videoPlayerState)
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={video_placeholder}
                      alt="비디오를 업로드해주세요."
                      style={{ marginBottom: "32px" }}
                    ></img>
                    <div>
                      <input onChange={(e) => setVideoFile(e.target.files[0])}
                        type="file"
                        accept="video/*"
                        style={{ display: "none" }}
                        ref={uploadFile}
                      />
                      <Button
                        className={styles.upload__btn}
                        onClick={() => uploadFile.current.click()}
                      >
                        비디오 업로드
                      </Button>
                    </div>
                  </>
                )
              }
            </section>

            {
              videoFile && (
                <>
                  <section
                    style={{
                      width: '100%',
                      marginTop: 30,
                      marginBottom: 62,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <MultiRangeSlider
                      min={0}
                      max={100}
                      onChange={({ min, max }) => {
                        setSliderValues([min, max])
                      }}
                    />
                  </section>
                  <section>
                    <VideoConversionButton
                      onConversionStart={() => {
                        setProcessing(true);
                      }}
                      onConversionEnd={() => {
                        setProcessing(false);
                        setShow(true);
                      }}
                      ffmpeg={ffmpeg}
                      videoPlayerState={videoPlayerState}
                      sliderValues={sliderValues}
                      videoFile={videoFile}
                    />
                  </section>
                </>
              )}
          </article>
        ) : (
          <article className="pc-layout" style={{ padding: "56px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h1 className={styles.title}>Video Edit</h1>
              {videoFile && (
                <div>
                  <input onChange={(e) => setVideoFile(e.target.files[0])}
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    ref={uploadFile}
                  />
                  <Button
                    onClick={() => uploadFile.current.click()}
                    className={styles.re__upload__btn}
                    style={{ width: "fit-content" }}
                  >
                    비디오 재선택
                  </Button>
                </div>
              )}
            </div>
            <section>
              {
                videoFile ? (
                  <VideoPlayer
                    src={videoFile}
                    onPlayerChange={(videoPlayer) => {
                      setVideoPlayer(videoPlayer)
                    }}
                    onChange={(videoPlayerState) => {
                      setVideoPlayerState(videoPlayerState)
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={video_placeholder}
                      alt="비디오를 업로드해주세요."
                      style={{
                        width: "100%",
                        maxHeight: "inherit", 
                        marginBottom: "32px" }}
                    ></img>
                    <div>
                      <input onChange={(e) => setVideoFile(e.target.files[0])}
                        type="file"
                        accept="video/*"
                        style={{ display: "none" }}
                        ref={uploadFile}
                      />
                      <Button
                        className={styles.upload__btn}
                        onClick={() => uploadFile.current.click()}
                      >
                        비디오 업로드
                      </Button>
                    </div>
                  </>
                )
              }
            </section>

            {
              videoFile && (
                <>
                  <section
                    style={{
                      width: '100%',
                      marginTop: 30,
                      marginBottom: 62,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <MultiRangeSlider
                      min={0}
                      max={100}
                      onChange={({ min, max }) => {
                        setSliderValues([min, max])
                      }}
                    />
                  </section>
                  <section style={{display: 'flex', gap: 16}}>
                    <VideoConversionButton
                      onConversionStart={() => {
                        setProcessing(true);
                      }}
                      onConversionEnd={() => {
                        setProcessing(false);
                        setShow(true);
                      }}
                      ffmpeg={ffmpeg}
                      videoPlayerState={videoPlayerState}
                      sliderValues={sliderValues}
                      videoFile={videoFile}
                    />
                  </section>
                </>
              )}
          </article>
        )
      }
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
    </>

  );
};

export default VideoEditor;

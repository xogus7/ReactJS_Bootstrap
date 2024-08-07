import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import video_placeholder_black from "../assets/images/editor/video_placeholder_black.png";
import video_placeholder_white from "../assets/images/editor/video_placeholder_white.png";
import { toTimeString } from "../utils/utils";
import { VideoEditorContext } from "../pages/VideoEditor/VideoEditor";
import { ThemeContext } from "../App";
import VideoPlayer from "./VideoPlayer";
import MultiRangeSlider from "./MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";
import './DeviceLayout.css';

const DeviceLayout = () => {
  const {
    device,
    sliderValues, setSliderValues,
    currentVideoValue, setCurrentVideoValue,
    videoFile, setVideoFile,
    videoPlayerState, setVideoPlayerState,
    videoPlayer, setVideoPlayer,
    processing, setProcessing,
    showSuccess, setShowSuccess,
    showFail, setShowFail,
    ffmpeg
  } = useContext(VideoEditorContext)
  const [mode] = useContext(ThemeContext);

  const uploadFile = useRef("");

  return (
    
    <article className={`${device}_layout`}>
      <div className="video_edit_title"
      >
        <h1 className="title">Video Edit</h1>
        {videoFile && (
          <div className="re_upload">
            <input onChange={(e) => setVideoFile(e.target.files[0])}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              ref={uploadFile}
            />
            <Button
              onClick={() => uploadFile.current.click()}
              className='re__upload__btn'
            >
              비디오 재선택
            </Button>
          </div>
        )}
      </div>
      <section className={`video ${device}`} style={{width: '100%', height: '100%'}}>
        {
          videoFile ? (
            <>
              <VideoPlayer
                src={videoFile}
                onPlayerChange={(videoPlayer) => setVideoPlayer(videoPlayer)}
                onChange={(videoPlayerState) => setVideoPlayerState(videoPlayerState)}
              />
              <div className="currTime">
                {videoPlayerState &&
                  `${toTimeString(Math.round(videoPlayerState.currentTime))}/${toTimeString(Math.round(videoPlayerState.duration))}`}
              </div>
            </>
          ) : (
            <>
              <img className={`video_placeholder_img ${device}`}
                src={mode === "dark" ? video_placeholder_black : video_placeholder_white}
                alt="비디오를 업로드해주세요."
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  setVideoFile(droppedFile);
                }}
                onClick={() => uploadFile.current.click()}
              />
              <div className="upload__btn_container">
                <input onChange={(e) => setVideoFile(e.target.files[0])}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  ref={uploadFile}
                />
                <Button className="upload__btn"
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
        videoFile && videoPlayerState && (
          <>
            <section className="video_slider">
              <MultiRangeSlider
                min={0}
                curr={videoPlayerState.currentTime}
                max={100}
                onChange={({ min, curr, max }) => {
                  setSliderValues([min, max])
                  setCurrentVideoValue(curr)
                }}
                duration={videoPlayerState.duration}
              />
            </section>
            <section className={`video_conversion ${device}`}>
              <VideoConversionButton
                onConversionStart={() => setProcessing(true)}
                onConversionEnd={() => {
                  setProcessing(false);
                  setShowSuccess(true);
                }}
                onConversionFail={() => {
                  setProcessing(false);
                  setShowFail(true);
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
  );
}

export default DeviceLayout;
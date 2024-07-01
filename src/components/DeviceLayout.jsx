import { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import video_placeholder from "../assets/images/editor/video_placeholder.png";
import VE_White from "../assets/images/editor/VE_White.png"
import VideoPlayer from "./VideoPlayer";
import MultiRangeSlider from "./MultiRangeSlider";
import VideoConversionButton from "./VideoConversionButton";

import { VideoEditorContext } from "../pages/VideoEditor/VideoEditor";
import { fetchFile } from "@ffmpeg/ffmpeg";
import { toTimeString } from "../utils/utils";

import './DeviceLayout.css';

const DeviceLayout = () => {
  const {
    device,
    sliderValues, setSliderValues,
    videoFile, setVideoFile,
    videoPlayerState, setVideoPlayerState,
    videoPlayer, setVideoPlayer,
    processing, setProcessing,
    show, setShow,
    ffmpeg
  } = useContext(VideoEditorContext)

  const sliderImagePath = '../assets/images/sliderImgaes'

  const videoTosliderImages = async () => {
    if (videoPlayerState) {
      // ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
      // await ffmpeg.run("-i", "input.mp4", "-r", `1/1`, `${sliderImagePath}/frame%d.png`)
      // const data = ffmpeg.FS('readFile', `${sliderImagePath}/frame1..png`);
      // console.log(data)
    }
  }
  useEffect(() => {
    videoTosliderImages()
  }, [videoFile])

  const uploadFile = useRef("");

  return (
    
    <article className={`${device}_layout`}>
      <header>
        <div className="header_container">
          <img src={VE_White} />
        </div>
      </header>
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
      <section className="video">
        {
          videoFile ? (
            <><VideoPlayer
              src={videoFile}
              onPlayerChange={(videoPlayer) => {
                setVideoPlayer(videoPlayer);
              }}
              onChange={(videoPlayerState) => {
                setVideoPlayerState(videoPlayerState);
              }} />
              <div className="currTime">
                {videoPlayerState &&
                  `${toTimeString(Math.round(videoPlayerState.currentTime))}/${toTimeString(Math.round(videoPlayerState.duration))}`}
              </div></>
          ) : (
            <>
              <img className={`video_placeholder_img_${device}`}
                src={video_placeholder}
                alt="비디오를 업로드해주세요."
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  setVideoFile(droppedFile);
                }}
                onClick={() => uploadFile.current.click()}
              ></img>
              <div>
                <input onChange={(e) => setVideoFile(e.target.files[0])}
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                  ref={uploadFile}
                />
                <Button
                  className="upload__btn"
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
                curr={2}
                max={100}
                onChange={({ min, curr, max }) => {
                  setSliderValues([min, curr, max])
                }}
                duration={videoPlayerState.duration}
              />
            </section>
            <section className={`video_conversion_${device}`}>
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
  );
}

export default DeviceLayout;
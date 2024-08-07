import { Button } from 'antd';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { readFileAsBase64, sliderValueToVideoTime } from '../utils/utils';
import out from '../assets/icons/out.svg';
import dark_download from '../assets/icons/dark_download.svg';
import audio_icon from '../assets/icons/audio.svg';
import { useContext, useEffect, useState } from 'react';
import './VideoConversionButton.css'
import { VideoEditorContext } from '../pages/VideoEditor/VideoEditor';
function VideoConversionButton({
    onConversionStart = () => { },
    onConversionEnd = () => { },
    onConversionFail = () => { },
    onGifCreated = () => { },
}) {
    const { videoPlayerState,
        sliderValues,
        videoFile,
        ffmpeg,
        hasAudio } = useContext(VideoEditorContext);
    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);


    const convertToGif = async () => {
        // starting the conversion process
        onConversionStart(true);

        const inputFileName = 'input.mp4';
        const outputFileName = 'output.gif';

        try {
            // writing the video file to memory
            ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));

            // cutting the video and converting it to GIF with a FFMpeg command
            await ffmpeg.run('-i', inputFileName, '-ss', `${minTime}`, '-to', `${maxTime}`, '-f', 'gif', outputFileName);
            
            // reading the resulting file
            const data = ffmpeg.FS('readFile', outputFileName);

            // converting the GIF file created by FFmpeg to a valid image URL
            const gifUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));

            const link = document.createElement('a');
            link.href = gifUrl;
            link.setAttribute('download', '');
            link.click();
        } catch (error) {
            console.log(error);
            onConversionFail(false);
            return;
        }


        // ending the conversion process

        onConversionEnd(false);
    };

    const onCutTheVideo = async () => {
        onConversionStart(true);

        const inputFileName = 'input.mp4';
        const outputFileName = 'output.mp4';

        try {
            ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
            await ffmpeg.run('-ss', `${minTime}`, '-i', 'input.mp4', '-t', `${maxTime}`, '-c', 'copy', `${outputFileName}`);

            const data = ffmpeg.FS('readFile', outputFileName);
            const dataURL = await readFileAsBase64(new Blob([data.buffer], { type: 'video/mp4' }));

            const link = document.createElement('a');
            link.href = dataURL;
            link.setAttribute('download', '');
            link.click();
        } catch (error) {
            console.log(error);
            onConversionFail(false);
            return;
        }


        onConversionEnd(false);
    };

    const converToAudio = async () => {
        onConversionStart(true);

        const inputFileName = 'input.mp4';
        const outputFileName = 'output.mp3';

        try {
            ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFile));
            await ffmpeg.run('-i', inputFileName, '-ss', `${minTime}`, '-to', `${maxTime}`, '-q:a', '0', '-f', 'mp3', outputFileName);
            const data = ffmpeg.FS('readFile', outputFileName);
            const dataURL = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));

            const link = document.createElement('a');
            link.href = dataURL;
            link.setAttribute('download', '');
            link.click();

        } catch (error) {
            console.log(error);
            onConversionFail(false);
            return;
        }

        onConversionEnd(false);
    };

    return (
        <>
            <Button onClick={() => convertToGif()} className="gif__out__btn">
                <img src={out} alt="GIF 변환" />
                <p>GIF 변환</p>
            </Button>

            <Button onClick={() => onCutTheVideo()} className="gif__out__btn" disabled={(max - min) === 100}
            >
                <img src={dark_download} alt="비디오 저장" />
                <p>비디오 저장</p>
            </Button>
            <Button onClick={() => converToAudio()} className="gif__out__btn" disabled={hasAudio === false}>
                <img src={audio_icon} alt="오디오 추출" style={{ width: '20px', height: '20px' }} />
                <p>오디오 추출</p>
            </Button>
        </>
    );
}

export default VideoConversionButton;

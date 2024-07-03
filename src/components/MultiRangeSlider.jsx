import { useCallback, useEffect, useState, useRef, useContext } from 'react';
import classnames from 'classnames';
import './MultiRangeSlider.css';
import { VideoEditorContext } from '../pages/VideoEditor/VideoEditor';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { toTimeString } from '../utils/utils';

export default function MultiRangeSlider({ min, curr, max, onChange, disabled, duration }) {
    const { ffmpeg,
        videoFile, videoPlayer,
        videoPlayerState, checkAudio,
        setDone, setHasAudio,

    } = useContext(VideoEditorContext);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [currVal, setCurrVal] = useState(curr);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const currValRef = useRef(null);
    const range = useRef(null);
    const [minValShow, setMinValShow] = useState(false)
    const [maxValShow, setMaxValShow] = useState(false)
    const [currValShow, setCurrValShow] = useState(false)
    const [imageUrls, setImageUrls] = useState([])

    const rangeWidth = 98 // %
    let c = 0
    const rangeValueStyle = (value) => {
        return ({
            left: `${value * rangeWidth / 100}%`
        })
    }

    // Convert to percentage
    const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, curr: currVal, max: maxVal });
    }, [minVal, currVal, maxVal]);

    // 재생 시간에 따른 재생바 동기화
    useEffect(() => {
        if (videoPlayerState) {
            setCurrVal((videoPlayerState.currentTime / duration) * 100)
        }
    }, [videoPlayerState])

    // toFixed(2)
    const valueToVideoTime = (value) => {
        return Math.round(((duration * value) / 100) * 100) / 100
    }
    const rangeCurrValue = (event) => {
        let value = +event.target.value;
        if (value <= minVal)
            value = minVal;
        else if (value >= maxVal)
            value = maxVal;
        setCurrVal(value);
        event.target.value = value.toString();
    }

    const videoToSliderImages = async () => {
        let imgURL = []
        if (!ffmpeg.isLoadied && videoPlayerState.duration) {
            try {
                ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));
                await ffmpeg.run("-skip_frame", "nokey", "-i", "input.mp4", "-vf", `fps=1/${videoPlayerState.duration / 11}`, `frame%d.png`);
                for (let i = 1; i <= 10; i++) {
                    const data = ffmpeg.FS('readFile', `frame${i}.png`);
                    const dataURL = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
                    imgURL.push(dataURL);
                }

            } catch (error) {
                console.log(error);
                return;
            }
            setImageUrls(imgURL);
        }
    }
    useEffect(() => {
        setImageUrls([]);
        videoToSliderImages();
        setMinVal(0);
        setMaxVal(100);
        setDone(false);
        setHasAudio(false);
    }, [videoPlayerState.duration])

    return (
        <div style={{ width: `${rangeWidth}%` }}>

            <div className="slider">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={classnames('thumb thumb--zindex-3', {
                        'thumb--zindex-5': minVal > max - 100,
                    })}
                    onMouseEnter={() => setMinValShow(true)}
                    onMouseLeave={() => setMinValShow(false)}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={currVal}
                    ref={currValRef}
                    onChange={rangeCurrValue}
                    className={classnames('thumb thumb--zindex-3 currVal', {
                    })}
                    onMouseEnter={() => setCurrValShow(true)}
                    onMouseLeave={() => setCurrValShow(false)}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb thumb--zindex-4"
                    onMouseEnter={() => setMaxValShow(true)}
                    onMouseLeave={() => setMaxValShow(false)}
                />
                {minValShow && <div className="slider__left-value" style={rangeValueStyle(minVal)}>
                    {toTimeString(valueToVideoTime(minVal))}
                </div>}
                {currValShow && <div className="slider__curr-value" style={rangeValueStyle(currVal)}>
                    {toTimeString(valueToVideoTime(currVal))}
                </div>}
                {maxValShow && <div className="slider__right-value" style={rangeValueStyle(maxVal)}>
                    {toTimeString(valueToVideoTime(maxVal))}
                </div>}
                <div className="slider__track">
                    {imageUrls.map((url, index) => (
                        <div className="sliderImage_container">
                            <img src={url} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        
                    ))
                    
                    }
                </div>
                <div ref={range} className="slider__range" style={{ color: 'white' }}>
                    {!imageUrls.length && <> Loaing TimeLine Thumbnail..</>}
                </div>
            </div>
        </div>
    );
}
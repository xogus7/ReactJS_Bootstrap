import React, { useEffect, useState } from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css'

const VideoPlayer = ({ src, onPlayerChange, onChange, startTime = undefined }) => {
  const [player, setPlayer] = useState();
  const [playerState, setPlayerState] = useState();
  const [source, setSource] = useState();

  useEffect(() => {
    setSource(URL.createObjectURL(src))
  }, [src])

  useEffect(() => {
    if (playerState) {
      onChange(playerState)
    }
  }, [playerState])

  useEffect(() => {
    onPlayerChange(player)

    if (player) {
      player.subscribeToStateChange(setPlayerState)
    }
  }, [player])
  
  return (
    <div className='video_player' style={{width: "100%", height: "100%", objectFit: 'contain'}}>
      <Player
        fluid={false}
        width={"100%"}
        height={"100%"}
        ref={(player) => {
          setPlayer(player)
        }}
        startTime={startTime}
        src={source}
      >
        <source src={source} />
        <BigPlayButton position='center' />
        <LoadingSpinner />
        <ControlBar disableCompletely></ControlBar>
      </Player>
    </div>
  )
}

export default VideoPlayer;

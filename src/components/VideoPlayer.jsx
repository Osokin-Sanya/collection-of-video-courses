import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SelectOutlined,
  SoundOutlined,
} from "@ant-design/icons";

import { Storage } from "../utils";

export default function VideoPlayer({ lesson: { link = "", duration = 0 } }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(new Hls());

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const SPACE_KEY = 32;
  const LEFT_ARROW_KEY = 37;
  const RIGHT_ARROW_KEY = 39;

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case SPACE_KEY:
        event.preventDefault();
        handlePlayPause();
        break;
      case LEFT_ARROW_KEY:
        event.preventDefault();
        rewindVideo(-5);
        break;
      case RIGHT_ARROW_KEY:
        event.preventDefault();
        rewindVideo(5);
        break;
      default:
        break;
    }
  };

  const handlePictureInPicture = () => {
    document.pictureInPictureElement
      ? document.exitPictureInPicture()
      : videoRef.current.requestPictureInPicture();
  };

  const handleVolumeChange = (event) => {
    const DOMElementSound = document.querySelector(".sound");
    videoRef.current.volume = event.target.value;
    DOMElementSound.classList.remove("soundOff");
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = (event) => {
    if (videoRef.current) {
      const currentTime = Number(event.target.currentTime);
      setCurrentTime(currentTime);
      Storage.setVideoProgress(link, currentTime);
    }
  };

  const rewindVideo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const onVideoPlay = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };
  const togleSound = () => {
    const DOMElementSound = document.querySelector(".sound");

    if (videoRef.current.volume !== 0) {
      localStorage.setItem("videoVolume", videoRef.current.volume.toString());
      DOMElementSound.classList.add("soundOff");
    }
    if (videoRef.current.volume === 0) {
      const savedVolume = localStorage.getItem("videoVolume");
      DOMElementSound.classList.remove("soundOff");
      if (savedVolume !== null) {
        videoRef.current.volume = parseFloat(savedVolume);
      } else {
        videoRef.current.volume = 1;
      }
    } else {
      videoRef.current.volume = 0;
    }
  };
  useEffect(() => {
    return () => {
      hlsRef?.current?.detachMedia();
      hlsRef?.current?.destroy();
      videoRef?.current?.removeEventListener("loadedmetadata", onVideoPlay);
    };
  }, []);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = hlsRef.current;
      hls.loadSource(link);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, onVideoPlay);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = link;
      videoRef.current.addEventListener("loadedmetadata", onVideoPlay);
    }
  }, [link]);

  useEffect(() => {
    const savedProgress = Storage.getVideoProgress(link);
    if (savedProgress) {
      videoRef.current.currentTime = savedProgress;
      setCurrentTime(savedProgress);
    }
  }, [link]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls={false}
        onClick={handlePlayPause}
        onKeyDown={handleKeyDown}
        onTimeUpdate={handleTimeUpdate}
        tabIndex="0"
      >
        <source src={link} type="application/x-mpegURL" />
      </video>
      <div className="controls">
        {isPlaying ? (
          <PauseCircleOutlined
            onClick={handlePlayPause}
            className="video-button"
          />
        ) : (
          <PlayCircleOutlined
            onClick={handlePlayPause}
            className="video-button"
          />
        )}

        <SelectOutlined
          onClick={handlePictureInPicture}
          className="video-button"
        />
        <SoundOutlined onClick={togleSound} className="video-button sound" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={handleVolumeChange}
        />
        <div style={{ width: 500, display: "flex", alignItems: "center" }}>
          <DoubleLeftOutlined onClick={() => rewindVideo(-5)} />
          <input
            style={{ width: "100%" }}
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(event) => rewindVideo(event.target.value - currentTime)}
          />
          <DoubleRightOutlined onClick={() => rewindVideo(5)} />
        </div>
      </div>
    </div>
  );
}

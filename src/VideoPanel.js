import React from 'react';

const VideoPanel = () => {
  return (
    <div className="video-panel">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/uBFdSyDkPOU?autoplay=1"
        title="Bingo Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPanel;

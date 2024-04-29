import React from 'react';

function DownloadButton({ videoUrl }) {
  const downloadVideo = async () => {
    const response = await fetch(videoUrl);
    console.log(response);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'video.mp4');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button onClick={downloadVideo}>
      Download Video
    </button>
  );
}

export default DownloadButton;

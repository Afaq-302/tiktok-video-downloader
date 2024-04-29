import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import tiktokVideoDownloader from "./api";
import DownloadButton from "./DownloadButton";

const App = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add this line
  const handleClick = async () => {
    if (url === "") {
      setError("Please insert a URL");
      setTimeout(function () {
        setError("");
      }, 3000);
    } else if (!url.includes("tiktok.com")) {
      setError("Enter a valid URL");
      setTimeout(function () {
        setError("");
      }, 3000);
    }

    if (url !== "" && url.includes("tiktok.com")) {
      setLoading(true); // Set loading to true when the download starts
      try {
        const response = await tiktokVideoDownloader(url);
        console.log("response", response.data.data);
        setData(response.data.data);

        if (response.data.data.play) {
          const res = await fetch(response.data.data.play);
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "video.mp4");
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      }
      setLoading(false); // Set loading to false when the download ends
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="relative h-screen w-screen 0">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/deafnuhyi/video/upload/v1691783973/abstract-gradient-background_xqizdv.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 flex flex-col  items-center h-full">
        <h1 className="text-center text-3xl text-white font-bold mt-6 mb-4">
          TikTok Downloader | No Watermark
        </h1>

        <input
          type="text"
          placeholder="Enter Tiktok URL"
          className="my-4 px-2 py-2 rounded-lg text-gray-600 w-[30%] focus:outline-none text-[16px] sm:w-[60%]"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <button
        onClick={handleClick}
        className="bg-blue-500 text-white rounded-lg px-6 py-2 text-[14px] hover:bg-blue-600"
        disabled={loading} 
      >
        {loading ? 'Loading...' : 'Download'} 
      </button>

        <p
          className={`text-red-500 my-2 ${error ? "opacity-100" : "opacity-0"}`}
        >
          {error}
        </p>

        <div className="video-container my-3">
          {data && (
            <video controls className=" w-[640px] h-[400px]">
              <source src={data.play} type="video/mp4" />
              Your browser doesnot support the video tag
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

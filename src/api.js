import axios from "axios";

const tiktokVideoDownloader = async (url) => {

  const options = {
    method: "GET",
    url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
    params: {
      url,
      hd: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.REACT_APP_RapidAPI_Host,
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
};

export default tiktokVideoDownloader;

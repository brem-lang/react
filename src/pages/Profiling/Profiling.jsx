import React, { useRef, useEffect, useState } from "react";

const Profiling = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageTaken, setImageTaken] = useState(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1366,
          height: 800,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    let image_data_url = photo.toDataURL("image/jpeg");

    setImageTaken(image_data_url);
    console.log(image_data_url);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="Profilling">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto} className="cameraBtn">
          SNAP!
        </button>
      </div>
      <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto} className="cameraBtn">
          CLOSE!
        </button>
        <a href={imageTaken} download>
          Download
        </a>
      </div>
    </div>
  );
};

export default Profiling;

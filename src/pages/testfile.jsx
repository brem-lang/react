import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// import SliderImage1 from "../assets/images/slide-image01.jpg";
// import SliderImage2 from "../assets/images/slide-image02.jpg";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import required modules
// import { EffectFade, Pagination, Autoplay } from "swiper";

const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={() => window.location.reload(false)}>
    x
  </i>
);
export default function Testfile() {
  const notify = async () =>
    toast.warn("", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  return (
    <>
      {/* <section style={{ overflow: "hidden", maxHeight: "100vh" }}>
        <h1
          style={{
            position: "absolute",
            zIndex: 100,
            right: "50%",
            left: "50%",
            bottom: "50%",
          }}
        >
          JAMAR USMAN
        </h1>
        <div
          className="overlay"
          style={{
            background: "linear-gradient(to top right, #d2b48c, #000000)",
            opacity: 0.9,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        ></div>
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, EffectFade, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={SliderImage1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={SliderImage2} />
          </SwiperSlide>
        </Swiper>
      </section> */}
      <div>
        <button onClick={notify}>Notify!</button>
        {/* <ToastContainer /> */}
        <ToastContainer closeButton={CloseButton} />
      </div>
    </>
  );
}

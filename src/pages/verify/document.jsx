import React, { useEffect, useState } from "react";
import { axiosVerifyDoc } from "../../api/axios";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import ValidDocument from "./validDocument";
import SliderImage1 from "../../assets/images/slide-image01.jpg";
import SliderImage2 from "../../assets/images/slide-image02.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Pagination, Autoplay } from "swiper";

const Document = () => {
  const location = useLocation();
  const [valid, setValid] = useState(false);
  const [errorDoc, setErrorDoc] = useState(false);
  const [verifiedData, setVerifiedData] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh === true) {
      verifyDocument();
    }
  }, [refresh]);

  const verifyDocument = async () => {
    const val = location?.search.split("=")[1];

    if (!val) return;

    try {
      const res = await axiosVerifyDoc({
        params: {
          key: val,
        },
      });

      if (res.data.success === true) {
        setVerifiedData(res.data.data);
        setValid(true);
        setErrorDoc(false);
        console.log(res.data.data);
      }
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        setErrorDoc(true);
      }

      console.log(err);
      setRefresh(false);
    }
  };

  return (
    <section style={{ overflow: "hidden", maxHeight: "100vh" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 100,
          right: "0",
          left: "0",
          bottom: "0",
          top: "0",
          color: "#fff",
        }}
      >
        {errorDoc && (
          <div
            className="card-body clearfix"
            style={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              height: "95%",
              overflow: "hidden",
            }}
          >
            <blockquote
              className="quote-danger"
              style={{ background: "transparent" }}
            >
              <h6 style={{ fontSize: "30px" }}>
                {location?.search.split("=")[1]}
              </h6>
              <p>is not a valid document</p>
              <small>
                from <cite title="Source Title">Gensan Feedmil, inc.</cite>
              </small>
            </blockquote>
          </div>
        )}

        {valid && <ValidDocument data={verifiedData} />}
      </div>

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
    </section>
  );
};

export default Document;

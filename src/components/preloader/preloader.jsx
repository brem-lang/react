const Preloader = () => {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      <image
        className="animation__shake"
        src="%PUBLIC%/dist/img/AdminLTELogo.png"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
};

export default Preloader;

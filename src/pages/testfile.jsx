import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

export default function Testfile() {
  function notify() {
    toast.error("User unauthorized, login to continue!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <div className="App">
        <div className="btn-group">
          <button className="btn" onClick={notify} id="animate.css">
            click me
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

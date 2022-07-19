// import axios from "../../api/axios";
// import { useLocation } from "react-router-dom";

// import VerifyDocument from "./verifyDocument";
import ValidDocument from "./validDocument";

const Document = () => {
  // const location = useLocation().pathname;

  // const verifyDocument = async (e) => {
  //   e.preventDefault();

  //   const data = { document_no: location.split("/")[2] };
  //   console.log(data);

  //   const form = new FormData();
  //   form.append("data", JSON.stringify(data));

  //   try {
  //     const res = await axios.get(
  //       "https://data.endpoint.space/cl5qfl04b004609mlc692cvyt",
  //       form
  //     );

  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Document Page</h1>
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
      </section>

      {/* <VerifyDocument verifyDocument={verifyDocument} /> */}
      <ValidDocument />
    </div>
  );
};

export default Document;

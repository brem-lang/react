import { useEffect, useState } from "react";
import { axiosVerifyDoc } from "../../api/axios";
import { useLocation } from "react-router-dom";

import ValidDocument from "./validDocument";

const Document = () => {
  const location = useLocation();
  const [valid, setValid] = useState(false);
  const [errorDoc, setErrorDoc] = useState(false);
  const [verifiedData, setVerifiedData] = useState({});

  useEffect(() => {
    const verifyDocument = async () => {
      const val = location.search.split("=")[1];

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
        }
      } catch (err) {
        if (err.code === "ERR_BAD_REQUEST") {
          setErrorDoc(true);
        }

        console.log(err);
      }
    };
    return verifyDocument;
  }, [location]);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Document Verification</h1>
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
      </section>

      {/* {valid === false && <VerifyDocument verifyDocument={verifyDocument} />} */}

      {errorDoc && (
        <div className="card-body clearfix" style={{ maxHeight: "10rem" }}>
          <blockquote className="quote-danger">
            <p>This document is not a valid documents</p>
            <small>
              from <cite title="Source Title">Gensan Feedmil, inc.</cite>
            </small>
          </blockquote>
        </div>
      )}

      {valid && <ValidDocument data={verifiedData} />}
    </div>
  );
};

export default Document;

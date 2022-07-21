import { useState } from "react";
import { useNavigate } from "react-router-dom";

import WSDM from "../../data/wsdm.json";
import MiPdf from "../../components/PDF/miPdf";

const DataTable = () => {
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [item, setItem] = useState([]);

  const navigate = useNavigate();

  const handlePdf = (e, item) => {
    e.preventDefault();
    setItem(item);
    setIsOpenPdf(true);
  };

  const closePdfForm = (e) => {
    setIsOpenPdf(false);
    setItem([]);
  };

  const handleAddWSMI = () => {
    navigate("/create/wsmi");
  };

  return (
    <div className="content-wrapper">
      {isOpenPdf ? (
        <MiPdf
          code={item.document_series_no}
          item={item}
          close={closePdfForm}
        />
      ) : (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">DataTable with default features</h3>
          </div>
          <div className="card-body">
            <div className="clearfix">
              <button
                type="button"
                className="btn btn-primary float-right"
                onClick={() => handleAddWSMI()}
              >
                <i className="fas fa-plus"></i> Add item
              </button>
            </div>

            <table id="example1" className="table table-bordered">
              <thead>
                <tr>
                  <th>Document Series No</th>
                  <th>Customer name</th>
                  <th>Order No.</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {WSDM.map((item) => {
                  return (
                    <tr key={item.document_series_no}>
                      <td>{item.document_series_no}</td>
                      <td>{item.customer_name}</td>
                      <td>{item.order_no}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-warning"
                          onClick={(e) => handlePdf(e, item)}
                        >
                          <i className="fas fa-file-pdf info"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

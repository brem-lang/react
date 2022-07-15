import Qrcode from "../../components/qrcode/qrcodr";
import DATA from "../../data/MOCK_DATA.json";

console.log(DATA);

const DataTable = () => {
  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">DataTable with default features</h3>
        </div>
        <div className="card-body">
          <Qrcode />

          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Document Series No</th>
                <th>Customer name</th>
                <th>Customer Date</th>
                <th>Pallet Number</th>
                <th>Warehouse Location</th>
                <th>Warehouse</th>
                <th>QR Code</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Trident</td>
                <td>Internet Explorer 4.0</td>
                <td>Win 95+</td>
                <td>GFI+DateToday+Document Series No</td>
                <td>
                  <i class="fas fa-file-pdf"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

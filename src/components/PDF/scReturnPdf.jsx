import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

import Logo from "../../assets/images/gfi.jpg";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "80vh",
  },
  title: {
    width: "100%",
    textAlign: "center",
    letterSpacing: "10px",
    padding: "10",
    backgroundColor: "black",
    color: "white",
  },
  logo: {
    width: 250,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },

  //
  section2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  contentText: {
    fontSize: "12px",
  },
  doc_series_no: {
    fontSize: "8px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  contentText2: {
    fontSize: "8px",
  },
  flexRowContent: {
    display: "flex",
    flexDirection: "row",
  },

  qrcode: {
    width: 100,
    height: 100,
  },

  // Table
  table: {
    width: "94%",
    border: "1px solid black",
    position: "relative",
    alignSelf: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
    fontSize: "12px",
  },
  body: {
    fontSize: "8px",
    borderTop: "1px solid black",
    fontWeight: "light",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row2: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row3: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row4: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row5: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row6: {
    width: "14.29%",
    borderRight: "1px solid black",
  },
  row7: {
    width: "14.29%",
  },

  // Footer
  footer: {
    fontSize: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  textFooter: {
    textAlign: "right",
  },
});

// Create Document Component
const ScRPdf = ({ code, item, close }) => {
  const {
    created_at,
    document_series_no,
    assigned_to,
    technician,
    mfr_serial_no,
    contact_number,
    //
    serial_no,
    description,
    item_no,
    origin,
    priority,
    problem_type,
    status,
    remarks,
    // subject,
    // call_type,
  } = item;

  const date = moment(created_at).format("ll");

  return (
    <div>
      <button
        onClick={() => close(false)}
        style={{ float: "right", border: "none", fontSize: 15 }}
        type="button"
        className="btn btn-outline-info"
      >
        Close
      </button>
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={Logo} />

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>MFR Serial No.</Text>
                  <Text style={styles.contentText2}>Assigned To</Text>
                  <Text style={styles.contentText2}>Contact Number</Text>
                  <Text style={styles.contentText2}>Technician</Text>
                  <Text style={styles.contentText2}>Date Created</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{mfr_serial_no}</Text>
                  <Text style={styles.contentText2}>{assigned_to}</Text>
                  <Text style={styles.contentText2}>{contact_number}</Text>
                  <Text style={styles.contentText2}>{technician}</Text>
                  <Text style={styles.contentText2}>{date}</Text>
                </View>
              </View>
              <View style={styles.qrcode}>
                <Image src={code} />
                <Text style={styles.doc_series_no}>{document_series_no}</Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Serial No</Text>
                <Text style={styles.row2}>Description</Text>
                <Text style={styles.row2}>Item No.</Text>
                <Text style={styles.row3}>Origin</Text>
                <Text style={styles.row4}>Priority</Text>
                <Text style={styles.row5}>Problem Type</Text>
                <Text style={styles.row6}>Status</Text>
                <Text style={styles.row7}>Remarks</Text>
              </View>

              <View style={[styles.row, styles.body]}>
                <Text style={styles.row1}>{serial_no}</Text>
                <Text style={styles.row2}>{description}</Text>
                <Text style={styles.row2}>{item_no}</Text>
                <Text style={styles.row3}>{origin}</Text>
                <Text style={styles.row4}>{priority}</Text>
                <Text style={styles.row5}>{problem_type}</Text>
                <Text style={styles.row6}>{status}</Text>
                <Text style={styles.row7}>{remarks}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default ScRPdf;

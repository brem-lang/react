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
    marginTop: "-50",
    textAlign: "center",
    color: "black",
  },

  logo: {
    width: 135,
    height: 40,
    marginRight: "auto",
    marginBottom: 15,
    marginTop: "-15",
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
    letterSpacing: 1,
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
    fontSize: 9,
    paddingTop: 5,
  },
  sub_contentText2: {
    fontSize: 9,
    paddingTop: 5,
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
    customer_name,
    contact_number,
    phone_no,
    item_no,
    description,
    mfr_serial_no,
    serial_no,
    id,
    status,
    subject,
    origin,
    priority,
    assigned_to,
    technician,
    remarks,
    document_series_no,
    problem_type,
    call_type,
    prepared_by,
    approved_by,
    released_by,
    checked_by,
    noted_by,
  } = item;

  const date = moment(created_at).format("l");
  const time = moment(created_at).format("LT");

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
        <Document title={`Service Call ${document_series_no}`}>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Image style={styles.logo} src={Logo} />
              <Text style={styles.title}>Service Call</Text>
            </View>

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Customer Name :</Text>
                  <Text style={styles.contentText2}>Contact Person :</Text>
                  <Text style={styles.contentText2}>Phone No. :</Text>
                  <Text style={styles.contentText2}>Item No. :</Text>
                  <Text style={styles.contentText2}>Description :</Text>
                  <Text style={styles.contentText2}>Mfr Serial No. :</Text>
                  <Text style={styles.contentText2}>Serial No. :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{customer_name}</Text>
                  <Text style={styles.contentText2}>{contact_number}</Text>
                  <Text style={styles.contentText2}>{phone_no}</Text>
                  <Text style={styles.contentText2}>{item_no}</Text>
                  <Text style={styles.contentText2}>{description}</Text>
                  <Text style={styles.contentText2}>{mfr_serial_no}</Text>
                  <Text style={styles.contentText2}>{serial_no}</Text>
                </View>
              </View>

              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Call ID :</Text>
                  <Text style={styles.contentText2}>Created on :</Text>
                  <Text style={styles.contentText2}>Status :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{id}</Text>
                  <Text style={styles.contentText2}>
                    {date} {time}
                  </Text>
                  <Text style={styles.contentText2}>{status}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.section2, { marginBottom: -15 }]}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Subject :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{subject}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.section2, { marginTop: 15 }]}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  {/* <Text style={styles.contentText2}>Subject :</Text> */}
                  <Text style={styles.contentText2}>Origin :</Text>
                  <Text style={styles.contentText2}>Priority :</Text>
                </View>
                <View>
                  {/* <Text style={styles.contentText2}>{subject}</Text> */}
                  <Text style={styles.contentText2}>{origin}</Text>
                  <Text style={styles.contentText2}>{priority}</Text>
                </View>
              </View>

              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Problem Type :</Text>
                  <Text style={styles.contentText2}>Call Type :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{problem_type}</Text>
                  <Text style={styles.contentText2}>{call_type}</Text>
                </View>
              </View>

              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Assigned to :</Text>
                  <Text style={styles.contentText2}>Technician :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{assigned_to}</Text>
                  <Text style={styles.contentText2}>{technician}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.section2, { marginTop: 20 }]}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Prepared by :</Text>
                  <Text style={styles.contentText2}>Approved by :</Text>
                  <Text style={styles.contentText2}>Noted by :</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{prepared_by}</Text>
                  <Text style={styles.contentText2}>{approved_by}</Text>
                  <Text style={styles.contentText2}>{noted_by}</Text>
                </View>
              </View>

              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Released by :</Text>
                  <Text style={styles.contentText2}>Checked by :</Text>
                  <Text style={styles.contentText2}>Remarks :</Text>
                </View>
                <View style={{ marginRight: 100 }}>
                  <Text style={styles.sub_contentText2}>{released_by}</Text>
                  <Text style={styles.contentText2}>{checked_by}</Text>
                  <Text style={styles.contentText2}>{remarks}</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default ScRPdf;

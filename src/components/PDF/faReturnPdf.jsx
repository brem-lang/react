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
    width: 150,
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
    marginTop: "-19px",
  },
  contentText: {
    fontSize: "12px",
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
    width: "20%",
    borderRight: "1px solid black",
  },
  row2: {
    width: "20%",
    borderRight: "1px solid black",
  },
  row3: {
    width: "20%",
    borderRight: "1px solid black",
  },
  row4: {
    width: "20%",
    borderRight: "1px solid black",
  },
  row5: {
    width: "20%",
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
const FaRPdf = ({ code, item, close }) => {
  console.log(item);

  const {
    department,
    created_at,
    mr_no,
    approved_by,
    prepared_by,
    received_by,
    items,
    withdrawal_slip_no,
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
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <Image style={styles.logo} src={Logo} />

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText}>Withdrawal Slip No.</Text>
                  <Text style={styles.contentText2}>Department</Text>
                  <Text style={styles.contentText2}>MR No.</Text>
                  <Text style={styles.contentText2}>Date</Text>
                </View>
                <View>
                  <Text style={styles.contentText}>{withdrawal_slip_no}</Text>
                  <Text style={styles.contentText2}>{department}</Text>
                  <Text style={styles.contentText2}>{mr_no}</Text>
                  <Text style={styles.contentText2}>{date}</Text>
                </View>
              </View>
              <View style={styles.qrcode}>
                <Image src={code} />
              </View>
            </View>

            <View style={styles.table}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Item Code</Text>
                <Text style={styles.row2}>Item Description</Text>
                <Text style={styles.row3}>Qty</Text>
                <Text style={styles.row4}>Oum</Text>
                <Text style={styles.row5}>Reson</Text>
              </View>

              {items.map((item, index) => {
                return (
                  <View key={index} style={[styles.row, styles.body]}>
                    <Text style={styles.row1}>{item.item_code}</Text>
                    <Text style={styles.row2}>{item.item_description}</Text>
                    <Text style={styles.row3}>{item.qty}</Text>
                    <Text style={styles.row4}>{item.uom}</Text>
                    <Text style={styles.row5}>{item.reason}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.footer}>
              <View style={{ marginRight: 20 }}>
                <Text>Prepared by</Text>
                <Text>Aproved by</Text>
                <Text>Recieved by</Text>
              </View>

              <View>
                <Text>{prepared_by}</Text>
                <Text>{approved_by}</Text>
                <Text>{received_by}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default FaRPdf;

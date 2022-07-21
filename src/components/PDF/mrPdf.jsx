import QRCode from "qrcode";
import { useEffect, useState } from "react";

import { APP_URL } from "../../api/axios";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import itemData from "../../data/wsdm.json";

// import item =

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
    fontSize: "9px",
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
    width: "15%",
    borderRight: "1px solid black",
  },
  row2: {
    width: "20%",
    borderRight: "1px solid black",
  },
  row3: {
    width: "19%",
    borderRight: "1px solid black",
  },
  row4: {
    width: "15%",
    borderRight: "1px solid black",
  },
  row5: {
    width: "25%",
    borderRight: "1px solid black",
  },
  row6: {
    width: "25%",
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
// const MrPdf = ({ code, item, close }) => {
const MrPdf = ({ code, close }) => {
  const item = itemData[0];
  const [url] = useState(`${APP_URL}/verify?key=${code}`);
  const [qrcodes, setQrcodes] = useState("");

  console.log(item);

  const {
    asset_code,
    asset_description,
    asset_serial_no,
    asset_type,
    asset_value,
    department,
    id_no,
    name_of_employee,
    section,
  } = item;

  useEffect(() => {
    const GenerateQRCode = () => {
      if (url !== "") {
        QRCode.toDataURL(
          url,
          {
            width: 800,
            margin: 2,
          },
          (err, url) => {
            if (err) return console.error(err);
            setQrcodes(url);
          }
        );
      }
    };

    return GenerateQRCode;
  }, [url, qrcodes]);

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
            <View style={styles.section}>
              <Text style={styles.title}>Gensan Feedmill, Inc.</Text>
            </View>

            <View style={styles.table}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Asset Code</Text>
                <Text style={styles.row2}>Asset Description</Text>
                <Text style={styles.row3}>Asset Serial No</Text>
                <Text style={styles.row4}>Asset Type</Text>
                <Text style={styles.row5}>Asset Value</Text>
                <Text style={styles.row5}>Department</Text>
                <Text style={styles.row6}>Section</Text>
              </View>

              <View style={[styles.row, styles.body]}>
                <Text style={[styles.row1, { marginRight: "5px" }]}>
                  {asset_code}
                </Text>
                <Text style={styles.row2}>{asset_description}</Text>
                <Text style={styles.row3}>{asset_serial_no}</Text>
                <Text style={styles.row4}>{asset_type}</Text>
                <Text style={styles.row5}>{asset_value}</Text>
                <Text style={styles.row5}>{department}</Text>
                <Text style={styles.row6}>{section}</Text>
              </View>
            </View>

            {/* <View style={styles.footer}>
              <View style={{ marginRight: 20 }}>
                <Text>Prepared by</Text>
                <Text>Aproved by</Text>
                <Text>Released by</Text>
              </View>

              <View>
                <Text>{prepared_by}</Text>
                <Text>{approved_by}</Text>
                <Text>{released_by}</Text>
              </View>
            </View> */}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default MrPdf;

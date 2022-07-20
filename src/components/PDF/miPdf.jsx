import QRCode from "qrcode";
import { useEffect, useState } from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

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
    width: "25%",
    borderRight: "1px solid black",
  },
  row2: {
    width: "25%",
    borderRight: "1px solid black",
  },
  row3: {
    width: "10%",
    borderRight: "1px solid black",
  },
  row4: {
    width: "15%",
    borderRight: "1px solid black",
  },
  row5: {
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
const MiPdf = ({ code, item, close }) => {
  const [url] = useState(`localhost:3500/verify?key=${code}/${item.id}`);
  const [qrcodes, setQrcodes] = useState("");

  const {
    approved_by,
    customer_name,
    document_series_no,
    items,
    pallet_no,
    prepared_by,
    profit_center,
    released_by,
    sub_profit_center,
    warehouse,
    wh_location,
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

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText}>Document Series No</Text>
                  <Text style={styles.contentText2}>Customer Name</Text>
                  <Text style={styles.contentText2}>Pallet No.</Text>
                  <Text style={styles.contentText2}>Profit Center</Text>
                  <Text style={styles.contentText2}>Sub Profit Center</Text>
                  <Text style={styles.contentText2}>Warehouse</Text>
                  <Text style={styles.contentText2}>Warehouse Location</Text>
                </View>
                <View>
                  <Text style={styles.contentText}>{document_series_no}</Text>
                  <Text style={styles.contentText2}>{customer_name}</Text>
                  <Text style={styles.contentText2}>{pallet_no}</Text>
                  <Text style={styles.contentText2}>{profit_center}</Text>
                  <Text style={styles.contentText2}>{sub_profit_center}</Text>
                  <Text style={styles.contentText2}>{warehouse}</Text>
                  <Text style={styles.contentText2}>{wh_location}</Text>
                </View>
              </View>
              <View style={styles.qrcode}>
                <Image src={qrcodes} />
              </View>
            </View>

            <View style={styles.table}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Item Code</Text>
                <Text style={styles.row2}>Item Description</Text>
                <Text style={styles.row3}>Qty</Text>
                <Text style={styles.row4}>Oum</Text>
                <Text style={styles.row5}>Remarks</Text>
              </View>

              {items.map((item, index) => {
                return (
                  <View key={index} style={[styles.row, styles.body]}>
                    <Text style={[styles.row1, { marginRight: "5px" }]}>
                      {item.item_code}
                    </Text>
                    <Text style={styles.row2}>{item.item_description}</Text>
                    <Text style={styles.row3}>{item.qty}</Text>
                    <Text style={styles.row4}>{item.uom}</Text>
                    <Text style={styles.row5}>{item.remarks}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.footer}>
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
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default MiPdf;

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import {
  Table,
  TableHeader,
  DataTableCell,
  TableBody,
  TableCell,
} from "@david.kucsai/react-pdf-table";

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
    marginBottom: 15,
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
    justifyContent: "space-around",
  },

  textFooter: {
    textAlign: "right",
  },

  tableText: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

// Create Document Component
const FgRPdf = ({ code, item, close }) => {
  const {
    department,
    created_at,
    mr_no,
    approved_by,
    prepared_by,
    received_by,
    items,
    withdrawal_slip_no,
    document_series_no,
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
                <Text style={styles.doc_series_no}>{document_series_no}</Text>
              </View>
            </View>

            <View style={styles.table}>
              <Table data={items} zebra>
                <TableHeader textAlign={"center"} fontSize={12}>
                  <TableCell style={styles.tableText}>Item Code</TableCell>
                  <TableCell style={styles.tableText}>
                    Item Description
                  </TableCell>
                  <TableCell style={styles.tableText}>Qty</TableCell>
                  <TableCell style={styles.tableText}>Uom</TableCell>
                  <TableCell style={styles.tableText}>Reason</TableCell>
                </TableHeader>
                <TableBody fontSize={9} textAlign={"center"}>
                  <DataTableCell
                    style={styles.tableText}
                    getContent={(r) => r.item_code}
                  />
                  <DataTableCell
                    style={styles.tableText}
                    getContent={(r) => r.item_description}
                  />
                  <DataTableCell
                    style={styles.tableText}
                    getContent={(r) => r.qty}
                  />
                  <DataTableCell
                    style={styles.tableText}
                    getContent={(r) => r.uom}
                  />
                  <DataTableCell
                    style={styles.tableText}
                    getContent={(r) => r.reason}
                  />
                </TableBody>
              </Table>
            </View>

            <View>
              <View style={styles.footer}>
                <Text>Prepared by</Text>
                <Text>Aproved by</Text>
                <Text>Recieved by</Text>
              </View>

              <View style={styles.footer}>
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
export default FgRPdf;

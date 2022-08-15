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
  },
  contentText: {
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
    marginBottom: 15,
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
    marginVertical: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  textFooter: {
    textAlign: "center",
  },

  tableText: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

// Create Document Component
const DmPdf = ({ code, item, close }) => {
  const {
    approved_by,
    customer_name,
    document_series_no,
    items,
    prepared_by,
    released_by,
    product_name,
    order_no,
    purpose,
    created_at,
    checked_by,
    noted_by,
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
        <Document title={`Direct Material ${document_series_no}`}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Image style={styles.logo} src={Logo} />
              <Text style={styles.title}>Direct Material Withdrawal Slip</Text>
            </View>

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Customer Name</Text>
                  <Text style={styles.contentText2}>Purpose</Text>
                  <Text style={styles.contentText2}>Product Name</Text>
                  <Text style={styles.contentText2}>Order No</Text>
                  <Text style={styles.contentText2}>Date Created</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{customer_name}</Text>
                  <Text style={styles.contentText2}>{purpose}</Text>
                  <Text style={styles.contentText2}>{product_name}</Text>
                  <Text style={styles.contentText2}>{order_no}</Text>
                  <Text style={styles.contentText2}>{date}</Text>
                </View>
              </View>
              <View style={styles.qrcode}>
                <Image src={code} />
                <Text style={styles.contentText}>{document_series_no}</Text>
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
                  <TableCell style={styles.tableText}>Remarks</TableCell>
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
                    getContent={(r) => r.remarks}
                  />
                </TableBody>
              </Table>
            </View>

            <View>
              <View style={styles.footer}>
                <Text>Prepared by</Text>
                <Text>Approved by</Text>
                <Text>Released by</Text>
              </View>

              <View style={styles.footer}>
                <Text>{prepared_by}</Text>
                <Text>{approved_by}</Text>
                <Text>{released_by}</Text>
              </View>
            </View>
            <View style={{ marginTop: 15, marginRight: 180 }}>
              <View style={styles.footer}>
                <Text>Noted by</Text>
                <Text>Checked by</Text>
              </View>

              <View style={styles.footer}>
                <Text>{noted_by}</Text>
                <Text>{checked_by}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default DmPdf;

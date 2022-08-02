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
    letterSpacing: 1,
  },
  contentText: {
    fontSize: "12px",
  },

  contentText2: {
    fontSize: 10,
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
});

// Create Document Component
const MrPdf = ({ code, item, close }) => {
  const {
    asset_code,
    asset_description,
    asset_serial_no,
    asset_type,
    asset_value,
    section,
    department,
    name_of_employee,
    id_no,
    document_series_no,
    created_at,
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
        <Document title={`Memorandum ${document_series_no}`}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>

          <View style={styles.section}>
              <Text style={styles.title}>Memorandum</Text>
            </View>
            <Image style={styles.logo} src={Logo} />


            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Date</Text>
                  <Text style={styles.contentText2}>ID No.</Text>
                  <Text style={styles.contentText2}>Name of Employee</Text>
                  <Text style={styles.contentText2}>Department</Text>
                  <Text style={styles.contentText2}>Section</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{date}</Text>
                  <Text style={styles.contentText2}>{id_no}</Text>
                  <Text style={styles.contentText2}>{name_of_employee}</Text>
                  <Text style={styles.contentText2}>{department}</Text>
                  <Text style={styles.contentText2}>{section}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section2}>
              <View style={styles.flexRowContent}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.contentText2}>Asset Code</Text>
                  <Text style={styles.contentText2}>Asset Type</Text>
                  <Text style={styles.contentText2}>Asset Description</Text>
                  <Text style={styles.contentText2}>Asset Serial No.</Text>
                  <Text style={styles.contentText2}>Asset Value</Text>
                </View>
                <View>
                  <Text style={styles.contentText2}>{asset_code}</Text>
                  <Text style={styles.contentText2}>{asset_type}</Text>
                  <Text style={styles.contentText2}>{asset_description}</Text>
                  <Text style={styles.contentText2}>{asset_serial_no}</Text>
                  <Text style={styles.contentText2}>{asset_value}</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
export default MrPdf;

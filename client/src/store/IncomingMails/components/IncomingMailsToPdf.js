import React from "react";
import { Font, PDFViewer, Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import moment from "moment";

import { BasicTable } from "./pdfParts/BasicTable";

import font from "../../../../src/roboto-light-webfont.ttf";

Font.register({
  family: "Roboto",
  format: "truetype",
  src: font,
})

// Font.register({ family: 'Oswald', fonts: [
//   { src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf' }, // font-style: normal, font-weight: normal
//   { src: '<italics_oswald_source>', fontStyle: 'italic' },
//  ]});

const IncomingMailsToPdf = (props) => {
  return (
        <PDFViewer>
              <Document>
                <Page size="A4" style={styles.page} orientation="landscape">
                  <View style={styles.header}>
                    <View style={styles.headerLeft}>
                      <Image style={styles.logoImage} src="logo.png" />
                      {/* <Text>Image</Text> */}
                    </View>
                    <View style={styles.headerRight}>
                      <View style={styles.dateOfIssueBox}>
                        <View style={styles.dateOfIssuePlace}>
                          <Text>Miejsce: </Text>
                          <Text>Łódź</Text>
                        </View>
                        <View style={styles.dateOfIssueDate}>
                          <Text>Data: </Text>
                          <Text>{moment(new Date).format("D/M/Y")}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.top}>
                    <View style={styles.invoiceTitle}>
                      <Text>Wydruk poczty przychodzacej</Text>
                    </View>
                  </View>
                  <BasicTable items={props.items} />
                  {/* <View style={styles.summary}>
                    <Text style={styles.summaryText}>Podsumowanie:</Text>
                    <BasicTableSummary item={props.item} />
                  </View>
                  <View style={styles.totalPrice}>
                    <View style={styles.totalPriceNumeric}></View>
                  </View> */}
                  <View style={styles.bottom}></View>
                  <View style={styles.footer}>
                    <Text>© 2021 GM Pay</Text>
                  </View>
                </Page>
              </Document>
      </PDFViewer>
  );
}

export default IncomingMailsToPdf;

const styles = StyleSheet.create({
  page: {
    fontSize: 8,
    fontFamily: "Roboto"
  },
  //  header begin
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    padding: 15,
    fontFamily: "Roboto"
  },
  headerLeft: {
    display: "flex"
  },
  headerRight: {
    display: "flex"
  },
  logoImage: {
    display: "flex",
    width: 150,
    height: "auto"
  },
  dateOfIssueBox: {
    display: "flex",
    flexDirection: "column"
  },
  dateOfIssuePlace: {
    display: "flex",
    fontSize: 12
  },
  dateOfIssueDate: {
    display: "flex",
    fontSize: 12
  },
  // header end
  // top begin
  top: {
    display: "flex",
    flexDirection: "row"
  },
  invoiceTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
  },
  // top end
  // content begin
  content: {
    display: "flex",
    flexDirection: "column",
    padding: 15
  },
  // contentLeft: {
  //   display: "flex",
  //   flexDirection: "column",
  //   marginBottom: 15
  // },

  // contentCenter: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between"
  // },
  // content end
  // summary begin
  summary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  summaryText: {
    display: "inline-flex",
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 15,
    textDecoration: "underline"
  },
  // summary table end
  // bottom begin
  bottom: {
    display: "flex"
  },
  // bottom end
  // footer begin
  footer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e8e8e8",
    fontSize: 11,
    padding: 15,
    color: "#000",
    textAlign: "right",
  }
  // footer end
});
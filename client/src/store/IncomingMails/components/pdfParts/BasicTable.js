import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

export const BasicTable = ( props ) => {
  const { items } = props;
  let number = 1;

  const listContent = items.length > 0 ? items.map( item => {
    console.log("items", item);
      return (
      <View style={styles.tableContent} key={item._id}>
        <Text style={styles.tableContentLP}>{ number++ }</Text>
        <Text style={styles.tableDeliveryDate}>{moment(item.deliveryDate).format("D/M/Y")}</Text>
        <Text style={styles.tableSender}>{item.sender}</Text>
        <Text style={styles.tableDeliveryCase}>{item.deliveryCase}</Text>
        <Text style={styles.tableSignature}>{item.signature}</Text>
        <Text style={styles.tableDescription}>{item.description}</Text>
      </View>
      )
  }) : null;

  console.log("listContent",listContent);

  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderLP}>L.p.</Text>
        <Text style={styles.tableHeaderDeliveryDate}>Data doreczenia</Text>
        <Text style={styles.tableHeaderSender}>Nadawca</Text>
        <Text style={styles.tableHeaderDeliveryCase}>Sprawa</Text>
        <Text style={styles.tableHeaderSignature}>Sygnatura</Text>
        <Text style={styles.tableHeaderDescription}>Opis</Text>
      </View>
      { listContent && listContent }
    </View>
  );
};

// export const BasicTableSummary = ({ item: { netValue, grossValue } }) => {
//   return (
//     <View style={styles.summaryTable}>
//       <View style={styles.summaryTableHeader}>
//         <Text style={styles.summaryTableHeaderLowPrice}>Cena jedn. netto</Text>
//         <Text style={styles.summaryTableHeaderVat}>Stawka Vat: 23%</Text>
//         <Text style={styles.summaryTableHeaderHightPrice}>Wartosc Brutto</Text>
//       </View>
//       <View style={styles.summaryTableContent}>
//         <Text style={styles.summaryTableContentLowPrice}>{netValue}</Text>
//         <Text style={styles.summaryTableContentVat}>vat</Text>
//         <Text style={styles.summaryTableContentHightPrice}>{grossValue}</Text>
//       </View>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  table: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "column"
  },
  tableHeader: {
    color: "#fff",
    flexDirection: "row",
    borderColor: "#efefef",
    backgroundColor: "#D4A356",
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 12,
    marginTop: 15,
    marginBottom: 15,
  },
  tableHeaderLP: {
    width: 20,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableHeaderDeliveryDate: {
    width: 80,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableHeaderSender: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableHeaderDeliveryCase: {
    width: 120,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableHeaderSignature: {
    width: 60,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableHeaderDescription: {
    width: 100,
    borderRightColor: "grey",
    display: "inline-flex"
  },
  tableContent: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 12
  },
  tableContentLP: {
    width: 20,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableDeliveryDate: {
    width: 80,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableSender: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableDeliveryCase: {
    width: 120,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableSignature: {
    width: 60,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  tableDescription: {
    width: 100,
    borderRightColor: "grey",
    display: "inline-flex"
  },
  //summary table
  summaryTable: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "column"
  },
  summaryTableHeader: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 12
  },
  summaryTableHeaderLowPrice: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  summaryTableHeaderVat: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  summaryTableHeaderHightPrice: {
    width: 100,
    borderRightColor: "grey",
    display: "inline-flex"
  },
  summaryTableContent: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 12
  },
  summaryTableContentLowPrice: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  summaryTableContentVat: {
    width: 100,
    borderRightColor: "grey",
    borderRightWidth: 1,
    display: "inline-flex"
  },
  summaryTableContentHightPrice: {
    width: 100,
    borderRightColor: "grey",
    display: "inline-flex"
  }
});

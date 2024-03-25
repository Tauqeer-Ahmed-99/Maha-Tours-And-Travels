import { Box } from "@mui/joy";

import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import React from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-1.jpg";

const InvoiceTemplateScreen = () => {
  return (
    <Box height="100%" width="100%">
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page size="A4" style={{ padding: 20 }}>
            <View style={{ border: "1px solid black" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    src={React}
                    style={{ height: "50px", width: "50px" }}
                  />
                  <Text>1</Text>
                </View>
                <View>
                  <Text style={{ width: "50%" }}>2</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  );
};

export default InvoiceTemplateScreen;

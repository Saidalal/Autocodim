import { Document, Page, Text, View, StyleSheet, Image, } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "20px"
    },
    mainTitle: {
        width: "60%",
        fontWeight: "bold",
        fontSize: "16px",
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
    },
    xyz: {
        width: "60%",
        textAlign: "center"
    },
    img: {
        height: "10%",
        width: "90%",
        padding: 5,
    }
})
export const DownloadPdf = ({ imageUrl, chartData, title }) => {

    const renderTableData = () => {
        return (
            <View style={styles.tableContainer}>
                <View style={styles.row} >
                    <Text style={styles.mainTitle}>{title}</Text>
                    <Text style={styles.mainTitle}>{"Frame Number"}</Text>
                </View>
                <View>
                    {chartData[0]?.map((cellData1, cellIndex) => (
                        <View style={styles.row} key={cellIndex}>
                            <Text style={styles.xyz}>
                                {chartData[1]?.[cellIndex]}
                            </Text>
                            <Text style={styles.xyz}>{cellData1}</Text>

                        </View>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Document pageLayout="">
            <Page size="A4" style={styles.page} wrap={false}>
                <View>
                    <Text style={{ padding: 10, fontWeight: "bold", fontSize: "25px", textAlign: "center", marginTop: 15, textDecoration: "underline" }}>{`${title} over Frame Number`}</Text>
                    {imageUrl && <Image src={imageUrl} alt="Chart" style={styles.img} />}
                    {renderTableData()}
                </View>
            </Page>
        </Document>
    );
};
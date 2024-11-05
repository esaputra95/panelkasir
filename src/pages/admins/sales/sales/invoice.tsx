import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import {Table, TR, TH, TD} from '@ag-media/react-pdf-table';
import { PDFViewer } from '@react-pdf/renderer';
import useInvoice from '../../../../hooks/slices/sales/sales/useInvoice';
import formatter from '../../../../utils/currency';
import { t } from 'i18next';

// Create Document Component
const InvoicePage = () => {
    const {data, image} = useInvoice()
    return (
        <PDFViewer className='w-full h-screen'>
            <Document>
                <Page size="A5" orientation='landscape' style={styles.page}>
                    <View style={styles.section}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                                <Image 
                                    style={styles.stylesLogo} 
                                    src={`http://localhost:3002/images/${image}`} 
                                />
                                <View style={{maxWidth: 250, paddingLeft:4}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 12}}>FAKTUR PENJUALAN</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 'bold',fontSize: 9}}>Firnhae</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 9,fontFamily:'Roboto'}}>
                                            {"No. Faktur "}
                                        </Text>
                                        <Text style={{...styles.fontDefault}}>
                                            {": "+data?.invoice ?? ''}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 9, fontFamily:'Roboto'}}>
                                            {`${t("date")} : `}
                                        </Text>
                                        <Text style={{...styles.fontDefault}}>
                                            {""+data?.date ?? ''}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 9, fontFamily:'Roboto'}}>
                                            {`${t("warehouses")} : `}
                                        </Text>
                                        <Text style={{...styles.fontDefault}}>
                                            {""+data?.warehouses?.name ?? ''}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 9, fontFamily:'Roboto'}}>
                                            {`${t("address")} : `}
                                        </Text>
                                        <Text style={{...styles.fontDefault}}>
                                            {""+data?.warehouses?.address ?? ''}
                                        </Text>
                                    </View>
                                    {/* <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 9, fontWeight:'bold', fontFamily:'Roboto'}}>
                                            {"Pelanggan "}
                                        </Text>
                                        <Text style={{...styles.fontDefault}}>
                                            {': Eko Saputra'}
                                        </Text>
                                    </View>
                                    <Text style={{fontSize: 9}}>Alamat : Faktur penjualan adalah bukti tagihan yang dikeluarkan Pengusaha Kena Pajak (PKP) untuk konsumen atas pembelian sejumlah Barang/Jasa Kena Pajak (BKP/JKP</Text> */}
                                </View>
                            </View>
                            <View style={{maxWidth: 200}}>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.name}</Text>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.hp}</Text>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.province}</Text>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.city}</Text>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.subdistrict}</Text>
                                <Text style={{fontSize: 9, fontFamily:'Roboto'}}>{data?.members?.address}</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 4}}>
                            <Table style={styles.styleTd}>
                                <TH style={{backgroundColor: '#97cdc0'}}>
                                    <TD 
                                        style={{
                                            ...styles.styleTdHeader,
                                            maxWidth: 28
                                        }}
                                    >
                                        No
                                    </TD>
                                    <TD style={styles.styleTdHeader}>
                                        Nama
                                    </TD>
                                    <TD style={{
                                        ...styles.styleTdHeader,
                                        maxWidth: 48,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        Jumlah
                                    </TD>
                                    <TD style={{
                                        ...styles.styleTdHeader,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>
                                        Harga
                                    </TD>
                                    <TD style={{
                                        ...styles.styleTdHeader, 
                                        flexDirection: 'row', 
                                        justifyContent: 'flex-end'
                                    }}>
                                        Dis.
                                    </TD>
                                    <TD style={{
                                        ...styles.styleTdHeader, 
                                        flexDirection: 'row', 
                                        justifyContent: 'flex-end'
                                    }}>
                                        Total
                                    </TD>
                                </TH>
                                {
                                    data?.saleDetails.map((value, index)=> (
                                        <TR key={value.id}>
                                            <TD style={{...styles.styleTd, maxWidth: 28}}>
                                                {(index+1)}
                                            </TD>
                                            <TD style={styles.styleTd}>
                                                {value?.products?.name}
                                            </TD>
                                            <TD style={{
                                                ...styles.styleTd, 
                                                maxWidth: 48, 
                                                flexDirection: 'row', 
                                                justifyContent: 'flex-end'
                                            }}>
                                                {formatter.format(value?.quantity)}
                                            </TD>
                                            <TD style={{
                                                ...styles.styleTd,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end'
                                            }}>
                                                {formatter.format(value?.sellingPrice)}
                                            </TD>
                                            <TD style={{
                                                ...styles.styleTd,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end'
                                            }}>
                                                {formatter.format(value?.discount??0)}
                                            </TD>
                                            <TD style={{
                                                ...styles.styleTd,
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end'
                                            }}>
                                                {
                                                    formatter.format(((value?.sellingPrice ?? 0) * (value?.quantity ?? 0))-(value.discount ?? 0))
                                                }
                                            </TD>
                                        </TR>
                                    ))
                                }
                                
                            </Table>
                        </View>
                        <View style={{marginRight: 4, flexDirection:'row', justifyContent:'space-between'}}>
                            <View>
                                <Text style={styles.styleTd}>
                                    {data?.description}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection:'column',
                                alignItems: 'center'
                            }}>
                                <Text style={styles.styleTd}>Mengetahui</Text>
                                <Text style={{...styles.styleTd, marginTop: 24}}>(....................)</Text>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
};


// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFF',
    },
    section: {
        padding: 12
    },
    styleTd: {
        fontFamily: 'Roboto', fontWeight: 'light',fontSize: 9,
        padding: 4
    },
    styleTdHeader: {
        fontSize: 10,
        padding: 4,
    },
    stylesLogo: {
        height: 72,
        width: 72
    },
    fontDefault: {
        fontFamily: 'Roboto', fontWeight: 'light',fontSize: 9,
    }
});


export default InvoicePage;
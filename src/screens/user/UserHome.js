/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const UserHome = () => {
    const images = [
        { source: require('../../assets/images/Dummy.png'), text: 'Image 1' },
        { source: require('../../assets/images/Dummy.png'), text: 'Image 2' },
        { source: require('../../assets/images/Dummy.png'), text: 'Image 3' },
        { source: require('../../assets/images/Dummy.png'), text: 'Image 4' },
    ];
    const category = ['Criminal', 'Family', 'Divorce', 'Property', 'Civil', 'Imigiration', 'Buisness', 'Prosecutor', 'Tax']
    const [activeChip, setActiveChip] = useState(category[0]);

    const handleChipPress = (category) => {
        setActiveChip(category);
    };

    const Col = ({ numRows, children }) => {
        return (
            <View style={styles[`${numRows}col`]}>{children}</View>
        )
    }

    const Row = ({ children }) => (
        <View style={styles.row}>{children}</View>
    )

    return (
        <>
            <Header />
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView contentContainerStyle={{ padding: 15 }}>
                    {/* <Text style={styles.heading}>Choose a category</Text> */}
                    {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.chipContainer}>
                        {category.map((category, i) => (
                            <Pressable
                                key={i}
                                style={[
                                    styles.chips,
                                    {
                                        backgroundColor: activeChip === category ? '#151E70' : '#D9D9D9',
                                    },
                                ]}
                                onPress={() => handleChipPress(category)}
                            >
                                <Text style={{ color: activeChip === category ? '#ffff' : '#000000' }}>{category}</Text>
                            </Pressable>
                        ))}
                    </ScrollView> */}

                    <Text style={styles.heading}>Top Rated</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={styles.topRated}
                    >
                        {images.map((image, index) => (
                            <View key={index}>
                                <Image
                                    style={[styles.image, { marginRight: 10 }]}
                                    source={image.source}
                                />
                                <View style={styles.imageTextContainer}>
                                    <Text style={styles.imageText}>{image.text}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <Text style={styles.heading}>Near By</Text>       
                    <View style={styles.app}>
                        <Row>
                            <Col numRows={2} style={styles.col}>
                                <Image source={require('../../assets/images/Dummy.png')} style={styles.cardImage} />
                                <Text style={styles.Title}>First column</Text>
                            </Col>
                            <Col numRows={2} style={styles.col}>
                                <Image source={require('../../assets/images/Dummy.png')} style={styles.cardImage} />
                                <Text style={styles.Title}>Second column</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col numRows={1} style={styles.col}>
                                <Image source={require('../../assets/images/Dummy.png')} style={styles.cardImage} />
                                <Text style={styles.Title}>First column</Text>
                            </Col>
                            <Col numRows={1} style={styles.col}>
                                <Image source={require('../../assets/images/Dummy.png')} style={styles.cardImage} />
                                <Text style={styles.Title}>Second Column</Text>
                            </Col>
                        </Row>
                    </View>
                            <Pressable style={{marginTop : 20 ,justifyContent : 'center',alignItems: "center"}}>
                                <Text style={{backgroundColor : '#151E70',color : "#FFFF",borderWidth :1,padding : 5}}>View More</Text>
                            </Pressable>
                </ScrollView>
            </SafeAreaView>
            <Footer></Footer>
        </>
    )
}

export default UserHome

const styles = StyleSheet.create({
    Title : {
        fontSize : 16,
        color : '#000000',
        fontFamily: 'Inter-Bold',
    },
    cardImage: {
        height: 150,
        width: 150,
    },
    col: {
        alignItems: 'center', // Add this line to center the items
        borderWidth: 1,
        // ... other styles
    },
    app: {
        marginTop: 10,
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal:15,
        // margin : 10,
        // width: 200,
        // backgroundColor: "red",
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center'

    },
    row: {
        flexDirection: "row"
    },
    "1col": {
        // backgroundColor: "lightblue",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 1
    },
    "2col": {
        // backgroundColor: "green",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 2
    },
    "3col": {
        // backgroundColor: "orange",
        // borderColor: "#fff",
        borderWidth: 1,
        flex: 3
    },
    "4col": {
        // backgroundColor: "green/",
        // borderColor: "green",
        borderWidth: 1,
        flex: 4
    },
    mainContainer: {
        flex: 1,
    },
    heading: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: '#000000',
        marginLeft: 9
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row', // Arrange chips horizontally
        marginTop: 18,
        justifyContent: 'space-between', // Add this line to space chips evenly
    },
    chips: {
        borderRadius: 50,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        width: 106,
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 5,
        // Other styles as needed
    },

    chipText: {
        fontSize: 16,
        color: '#151E70',
        fontFamily: "Inter-Bold",
    },
    topRated: {
        marginTop: 10,
        paddingHorizontal: 16, // Add horizontal padding to the content container
    },
    image: {
        borderRadius: 10, // Add borderRadius or any other styles as needed
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: 5,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    imageText: {
        color: '#fff',
        fontSize: 30,
    },
});

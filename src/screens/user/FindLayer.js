/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Card from '../../components/Card'
// import card from '../../components/card';
import Card from '../../components/Card';
import { TextInput } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import PageLoader from '../../components/PageLoader';
import axios from 'axios';
import baseUrl from '../../constants';
const FindLawyer = ({ navigation }) => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filterApi, setFilterApi] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
    ]);
    const category = ['criminal', 'family', 'divorce', 'property', 'civil', 'imigiration', 'buisness', 'prosecutor', 'tax']
    const [activeChip, setActiveChip] = useState(category[0]);


    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
    const handleChipPress = (category) => {
        setActiveChip(category);
        setFilterApi(category)
    };
    const filterHandler = () => {
        setFilter(!filter)
    }
    const fetchLawyer = async () => {
        try {
            const response = await axios.get(`${baseUrl}lawyer?search=${searchTerm}&filter=${filterApi}`)
            if (response?.data?.status === 200) {
                setData(response?.data?.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error?.response?.data)

        }
    }




    const searchHandler = (text) => {
        setSearchTerm(text);
    };

    useEffect(() => {
        fetchLawyer()
    }, [searchTerm, filterApi])
    return (
        <>
            {
                isLoading ? (<PageLoader />) : (
                    <>
                        <Header />
                        <ScrollView style={styles.mainContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/landmark.png')} />
                                    <Text style={styles.Heading}>Find Lawyer</Text>
                                </View>
                            </View>
                            
                            {
                                !!data[0] ? <View>
                                    {
                                        data?.map(((ele, i) => {
                                            return (
                                                <Card ele={ele} key={i} />
                                            )
                                        }))
                                    }
                                </View> : (
                                    <View style={{justifyContent :'center',alignItems : 'center'}}>
                                        <Text style={{color : '#000000' , fontFamily:'Inter-Bold'}}>No data :(</Text>
                                    </View>
                                )
                            }
                        </ScrollView>
                        <Footer />
                    </>
                )
            }
        </>
    )
}

export default FindLawyer

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFFF",
        flex: 1,
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
    dropDownw: {
        marginTop: '2%',
        // borderWidth :1,
        borderRadius: 50
    },
    Heading: {
        fontSize: 25,
        marginLeft: 10,
        color: "#000000",
        fontFamily: "Inter-Bold",
        // marginLeft : 10  
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "gray",
        // borderRadius: RFPercentage(4),
        padding: RFPercentage(1.2),
        fontFamily: "Cabin-Regular",
        fontSize: RFPercentage(1.7),
        paddingLeft: RFPercentage(4),
        marginTop: RFPercentage(2),
    },
});

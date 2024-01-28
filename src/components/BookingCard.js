/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const BookingCard = ({ bodyData, value, setValue, appointmentData }) => {

    const [selected, setSelected] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Skype', value: 'skype' },
        { label: 'Call', value: 'call' },
        { label: 'Message', value: 'message' },
        { label: 'Visit To My Location', value: 'visit' },
    ]);
    const [category, setCategory] = useState(['12:00', '3:00', '4:00', '6:00'])
    const [activeChip, setActiveChip] = useState(category[0]);
    const [markedDates, setMarkedDates] = useState({});

    // handling the day validation
    useEffect(() => {
        const generateMarkedDates = () => {
            const dates = {};

            appointmentData?.forEach((appointment) => {
                const formattedDate = new Date(appointment.date).toISOString().split('T')[0];

                dates[formattedDate] = dates[formattedDate] ? dates[formattedDate] + 1 : 1;
            });

            Object.keys(dates).forEach((date) => {
                if (dates[date] === 4) {
                    dates[date] = { selected: true, marked: true, selectedColor: 'red' };
                }
            });

            return dates;
        };

        const markedDatesResult = generateMarkedDates();
        setMarkedDates(markedDatesResult);
    }, [appointmentData]);


    // handle the timing avalibilty validation
    const handleChipPress = (category) => {
        setActiveChip(category);
        bodyData.time = category
        bodyData.medium = value

    };

    // handling the time availabilt
    const HandleChip = (day) => {
        bodyData.date = day?.dateString
        const filteredAppointments = appointmentData?.filter((appointment) => {
            const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
            return formattedDate === day?.dateString
        });
        if (filteredAppointments[0]) {
            const data = filteredAppointments?.map((ele) => {
                return ele?.time
            })
            const newCategory = category?.filter((e) => {
                return !data?.includes(e);
            });
            console.log(newCategory, 'returnData');
            setCategory(newCategory);
        } else {
            setCategory(['12:00', '3:00', '4:00', '6:00'])
        }
    }
    return (
        <>
        <View style={styles.cardContainer}>
            <Text style={{ color: "#000000", fontSize: 16, margin: 8, fontFamily: 'Inter-Bold' }}>Select Service</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="select medium of communication"
            />
            <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#000000", fontSize: 16, margin: 8, fontFamily: 'Inter-Bold' }}>Select Date</Text>
                <Calendar
                    // Customize the appearance of the calendar
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350
                    }}
                    // Specify the current date
                    // current={'2024-1-14'}
                    // Callback that gets called when the user selects a day
                    onDayPress={day => HandleChip(day)}
                    // onDayPress={day => {
                    //     bodyData.date = day?.dateString
                    //     console.log('selected day', day?.dateString);
                    //     console.log(bodyData)
                    // }}
                    // Mark specific dates as marked
                    markedDates={markedDates}
                />
            </View>
            <Text style={{ color: "#000000", fontSize: 16, margin: 8, fontFamily: 'Inter-Bold' }}> Select Time</Text>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: 'nowrap', marginTop: 10 }}>
                {!!category[0] ? (
                    category.map((category, i) => (
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
                    ))
                ) : (
                    <>
                        <View style={{ justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ alignItems: 'center', color: '#000000', fontFamily: "Inter-Bold" }}>Not Available Today</Text>
                        </View>
                    </>
                )}

            </View>
        </View>
        </>
    )
}

export default BookingCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F3F2F2',
        borderWidth: 1,
        // height: 2000,
        // borderRadius: 10,
        // elevation: 3,
        margin: 10,
        padding: 15,
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginTop: 15,
        height: 5,
        width: '100%',
        backgroundColor: '#FFFF'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 15,
    },
    headerText: {
        flex: 1,
        marginLeft: 25,
    },
    name: {
        fontSize: 30,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    experience: {
        fontSize: 16,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    details: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColumn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailItem: {
        fontSize: 16,
        marginLeft: 5,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    footer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#151E70",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    footerItem: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Inter-Bold",
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
        width: 75,
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
})
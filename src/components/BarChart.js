/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function BarChartofOrders({graphData}) {
    const labels = generateMonthLabels(12);
    const data = {
        labels: labels,
        datasets: [
            {
                data: graphData,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        color: () => '#000000',
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barRadius: 12,
        barPercentage: 0.7,
        formatYLabel: (label) => Math.round(label),
    };

    return (
        <>
            <Text style={styles.head}>Carrear Stats</Text>
            <BarChart
                data={data}
                width={Dimensions.get("window").width - 0}
                height={220}
                chartConfig={chartConfig}
                style={styles.barchart}
                withInnerLines={false}
                withVerticalLines={false}
                showBarTops={false}
                fromZero
            />
        </>
    );
}
const styles = StyleSheet.create({
    head: {
        color : "#051744",
        fontSize: RFPercentage(3),
        fontFamily: "Inter-Bold",
        top: "3%",
        left: "4%",
    },
    barchart: {
        marginVertical: RFPercentage(5),
        // top: "3%",
        marginRight: 42,
        alignSelf: "center",
    },
});

// Function to generate an array of month labels
const generateMonthLabels = (count) => {
    const currentDate = new Date();
    const labels = [];
    for (let i = 0; i < count; i++) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        labels.unshift(currentDate.toLocaleString("default", { month: "short" }));
    }
    return labels;
};

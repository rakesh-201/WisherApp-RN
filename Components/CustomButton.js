import React from 'react'
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import Color from '../Constants/Color'

const CustomButton = (props) => {
    const Touch = TouchableNativeFeedback

    if(Platform.OS === 'ios'){
        Touch = TouchableOpacity
    }

    return (
        <Touch onPress={props.deleteHandler} >
        <View style={styles.con} >
            <View style={styles.con1}>
                <Text style={{color: props.color}} >DELETE</Text>
            </View>
        </View>
        </Touch>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    con: {
        marginBottom: 15,
        height: 30,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 100
    },
    con1: {
        backgroundColor: Color.primary,
        padding: 10,
        borderBottomRightRadius: 20,
        alignItems: 'flex-start',
        paddingLeft: 5
    }
})

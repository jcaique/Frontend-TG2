import React from "react"
import { View, Text } from "react-native"

export default function NovaConta(props) {

    let {dono} = props.route.params

    return (
        <>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                padding: 16
            }}>

            <Text>WIP</Text>
            <Text>dono:{dono}</Text>

            </View>
        </>
    )

}
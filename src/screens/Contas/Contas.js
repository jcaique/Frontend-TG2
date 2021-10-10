import React from "react"
import { View, Text } from "react-native"

export default function Contas(props) {

    let {dono,url} = props.route.params

    return (
        <>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                padding: 16
            }}>

            <Text>WIP</Text>
            <Text>dono:{dono}</Text>
            <Text>url:{url}</Text>

            </View>
        </>
    )

}
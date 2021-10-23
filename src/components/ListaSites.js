import React from "react"
import { Card } from "react-native-paper"

function ListaSites({ info, onPress }) {

    return (
        <>

            <Card onPress={onPress} style={{ marginVertical: 4 }}>
                <Card.Title title={info.url} />
            </Card>
        </>
    )

}

export default ListaSites
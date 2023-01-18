import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native"
import { ActivityIndicator } from "react-native"
import { nanoid } from "nanoid"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

const Item = ({ API, Description }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{API}</Text>
    <Text>{Description}</Text>
  </View>
)

const AsyncReqList = ({ uri }) => {
  const [resultData, setResultData] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const toggleIsFetching = () => setIsFetching((prevState) => !prevState)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(uri)
      const json = await response.json()
      if (json.entries.length > 0) {
        const mappedResponseData = json.entries.map((obj) => {
          if (!obj.id) {
            return { id: nanoid(), ...obj }
          }
        })
        setResultData(mappedResponseData)
      }
      toggleIsFetching()
    }

    fetchData()
  }, [])

  const renderResults = () =>
    resultData.length > 0 ? (
      <FlatList
        data={resultData}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <Text>No results found, try a different search term.</Text>
    )

  return isFetching ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView styles={styles.container}>{renderResults()}</SafeAreaView>
  )
}

export default AsyncReqList

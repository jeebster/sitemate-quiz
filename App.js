import React, { useState } from "react"
import { StyleSheet, SafeAreaView } from "react-native"
import AsyncReqList from "./components/AsyncReqList"
import SearchBar from "./components/SearchBar"

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const sanitizeQuery = (queryStr) => queryStr // TODO: sanitize searchQuery prior to submitting API request...

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onCommit={(textStr) => setSearchQuery(textStr)} />
      {searchQuery.length > 0 && (
        <AsyncReqList
          uri={`https://api.publicapis.org/entries?category=${sanitizeQuery(
            searchQuery
          )}`}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default App

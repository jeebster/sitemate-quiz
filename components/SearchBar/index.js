import { useState, useRef } from "react"
import {
  SafeAreaView,
  TextInput,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"
import { Entypo } from "@expo/vector-icons"
import { Keyboard } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {},
})

const SearchBar = ({ onCommit }) => {
  const [clicked, setClicked] = useState(false)
  const searchBarTextRef = useRef()

  return (
    <SafeAreaView style={styles.container}>
      <View style={clicked ? styles.clicked : styles.unclicked}>
        <TextInput
          style={styles.input}
          placeholder="Search for an API Category"
          ref={searchBarTextRef}
          onChangeText={(changeText) => {
            setTimeout(() => {
              // Commit the search if string is non-empty
              if (changeText.length > 0) {
                onCommit(changeText)
              }
            }, 1500)
          }}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              searchBarTextRef.current.clear()
              Keyboard.dismiss
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default SearchBar

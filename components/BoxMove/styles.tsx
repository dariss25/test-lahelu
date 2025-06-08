import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  containerChild: {
    width: "100%",
    height: "100%",
  },
  active: {
    borderWidth: 0.8,
    borderColor: "lightgray",
  },
  deleteButton: {
    position: "absolute",
    top: -10,
    right: -20,
    zIndex: 100,
    width: 30,
    height: 30,
    backgroundColor: "lightgray",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  duplicateButton: {
    position: "absolute",
    top: -10,
    left: -20,
    zIndex: 100,
    width: 30,
    height: 30,
    backgroundColor: "lightgray",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconSize: {
    width: 15,
    height: 15,
  },
});

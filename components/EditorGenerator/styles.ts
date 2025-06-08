import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boxSelected: { borderWidth: 2, borderColor: "white" },
  container: { width: "100%", backgroundColor: "gray", padding: 10 },
  viewFontSize: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  textFont: { fontSize: 16, fontWeight: "bold", color: "white" },
  viewSlider: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 30,
  },
  slider: {
    width: "100%",
    height: 30,
  },
  viewFontColor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewBorderColor: {
    width: "70%",
    height: 40,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  },
  btnColor: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

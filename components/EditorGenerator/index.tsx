import { ColorGenerator } from "@/constants/ColorGenerator";
import Slider from "@react-native-community/slider";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface EditorGeneratorProps {
  fontSize: number;
  setFontSize: (value: number) => void;
  fontColor: string;
  setFontColor: (value: string) => void;
}

export default function EditorGenerator({
  fontSize,
  setFontSize,
  fontColor,
  setFontColor,
}: Readonly<EditorGeneratorProps>) {
  const isSelected = styles.boxSelected;

  return (
    <View style={styles.container}>
      <View style={styles.viewFontSize}>
        <Text style={styles.textFont}>Font Size</Text>
        <View style={styles.viewSlider}>
          <Slider
            step={1}
            style={styles.slider}
            minimumValue={10}
            maximumValue={100}
            value={fontSize}
            onValueChange={(value) => {
              setFontSize(value);
            }}
          />
        </View>
      </View>
      <View style={styles.viewFontColor}>
        <Text style={styles.textFont}>Font Color</Text>
        <View style={styles.viewBorderColor}>
          {ColorGenerator.map((color) => (
            <TouchableOpacity
              key={color.id}
              onPress={() => {
                setFontColor(color.color);
              }}
              style={[
                {
                  ...(fontColor === color.color && isSelected),
                  backgroundColor: color.color,
                },
                styles.btnColor,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

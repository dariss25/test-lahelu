import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface BoxMoveViewProps {
  active?: boolean;
  children: React.ReactNode;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function BoxMoveView({
  active = false,
  onDelete,
  onDuplicate,
  children,
}: Readonly<BoxMoveViewProps>) {
  const imageDelete = require("@/assets/images/icon_delete.png");
  const imageDuplicate = require("@/assets/images/icon_copy.png");

  return (
    <View style={[styles.container, active && styles.active]}>
      {active && (
        <TouchableOpacity onPress={onDuplicate} style={styles.duplicateButton}>
          <Image
            resizeMode="contain"
            source={imageDuplicate}
            style={styles.iconSize}
          />
        </TouchableOpacity>
      )}
      {active && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Image
            resizeMode="contain"
            source={imageDelete}
            style={styles.iconSize}
          />
        </TouchableOpacity>
      )}
      <View style={styles.containerChild}>{children}</View>
    </View>
  );
}

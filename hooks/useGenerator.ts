import { ItemProps, StyleTextProps } from "@/constants/Interfance";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  PanResponderInstance,
} from "react-native";
import ViewShot from "react-native-view-shot";

export default function useGenerator() {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [panResponders, setPanResponders] = useState<PanResponderInstance[]>(
    []
  );
  const pan = useRef(items.map(() => new Animated.ValueXY())).current;
  const scale = useRef(items.map(() => new Animated.Value(1))).current;
  const fileIndex = items.find((_, index) => index === selected);
  const [imageTemplate, setImageTemplate] = useState<number | null>(null);
  const refShoot = useRef<ViewShot>(null);

  const captureView = async () => {
    if (refShoot.current?.capture) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const uri = await refShoot.current.capture();
        saveLocalImage(uri);
      } else {
        Alert.alert(
          "Permission denied",
          "Please grant permission to save image"
        );
      }
    }
  };

  const saveLocalImage = async (imageUri: string) => {
    try {
      await MediaLibrary.createAssetAsync(imageUri);
      Alert.alert("Image saved to gallery", "Image saved to gallery");
    } catch {
      Alert.alert("Error saving image", "Error saving image");
    }
  };

  useEffect(() => {
    const newPanResponders = items.map((_, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setSelected(index);
          setItems((prevItems) => {
            const newItems = prevItems.map((item, i) => ({
              ...item,
              active: i === index,
            }));
            return newItems;
          });
        },
        onPanResponderMove: (evt, gestureState) => {
          Animated.event([null, { dx: pan[index].x, dy: pan[index].y }], {
            useNativeDriver: false,
          })(evt, gestureState);

          if (evt.nativeEvent.touches.length === 2) {
            const touch1 = evt.nativeEvent.touches[0];
            const touch2 = evt.nativeEvent.touches[1];

            const dx = touch1.pageX - touch2.pageX;
            const dy = touch1.pageY - touch2.pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const newScale = distance / 100;
            const clampedScale = Math.max(0.5, Math.min(100, newScale));

            scale[index].setValue(clampedScale);
            setItems((prevItems) => {
              const newItems = [...prevItems];
              newItems[index] = {
                ...newItems[index],
                scale: clampedScale,
              };
              return newItems;
            });
          }
        },
        onPanResponderRelease: () => {
          pan[index].extractOffset();
        },
      })
    );
    setPanResponders(newPanResponders);
  }, [items.length]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newItem = {
        id: items.length + 1,
        text: "",
        type: "image",
        source: result.assets[0].uri,
        width: 100,
        height: 100,
        scale: 1,
        active: false,
      } as ItemProps;
      setItems((prevItems) => [...prevItems, newItem]);
      pan.push(new Animated.ValueXY());
      scale.push(new Animated.Value(1));
    }
  };

  const addText = () => {
    const newItem = {
      id: items.length + 1,
      text: "Sample Text",
      type: "text",
      source: "",
      width: 100,
      height: 100,
      scale: 1,
      active: false,
      style: { fontSize: 10, color: "black" },
    } as ItemProps;
    setItems((prevItems) => [...prevItems, newItem]);
    pan.push(new Animated.ValueXY());
    scale.push(new Animated.Value(1));
  };

  const deleteItem = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const duplicateItem = (index: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(index, 0, {
        ...newItems[index],
        id: newItems.length + 1,
        active: false,
      });
      return newItems;
    });
    pan.push(new Animated.ValueXY());
    scale.push(new Animated.Value(1));
  };

  const setFontSizeStyle = (fontSize: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      if (selected !== null) {
        newItems[selected] = {
          ...newItems[selected],
          style: {
            ...(newItems[selected].style as StyleTextProps),
            fontSize,
          },
        };
      }
      return newItems;
    });
  };

  const setFontColorStyle = (color: string) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      if (selected !== null) {
        newItems[selected] = {
          ...newItems[selected],
          style: {
            ...(newItems[selected].style as StyleTextProps),
            color,
          },
        };
      }
      return newItems;
    });
  };

  return {
    imageTemplate,
    selected,
    panResponders,
    scale,
    pan,
    items,
    fileIndex,
    refShoot,
    captureView,
    setItems,
    setSelected,
    setImageTemplate,
    setFontSizeStyle,
    setFontColorStyle,
    deleteItem,
    duplicateItem,
    pickImage,
    addText,
  };
}

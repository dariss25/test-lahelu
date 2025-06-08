import BoxMoveView from "@/components/BoxMove";
import EditorGenerator from "@/components/EditorGenerator";
import { dataCompose } from "@/constants/data";
import useGenerator from "@/hooks/useGenerator";
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import { styles } from "../../assets/styles/generator";

export default function HomeScreen() {
  const {
    items,
    panResponders,
    pan,
    scale,
    fileIndex,
    imageTemplate,
    refShoot,
    captureView,
    setItems,
    setImageTemplate,
    setFontSizeStyle,
    setFontColorStyle,
    deleteItem,
    duplicateItem,
    pickImage,
    addText,
  } = useGenerator();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewTemplate}>
        <Text style={styles.textViewTemplate}>
          Select a meme template or upload your own image
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {dataCompose.map((item, index) => (
            <TouchableOpacity
              key={index + 1}
              onPress={() => {
                if (item.status) {
                  setImageTemplate(index);
                } else {
                  setImageTemplate(null);
                }
              }}
              style={styles.buttonTemplate}
            >
              <Image source={item.image} style={styles.imageTemplateBorder} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {fileIndex?.type === "text" && (
        <EditorGenerator
          fontSize={fileIndex.style?.fontSize as number}
          setFontSize={setFontSizeStyle}
          fontColor={fileIndex.style?.color as string}
          setFontColor={setFontColorStyle}
        />
      )}

      <ViewShot
        ref={refShoot}
        options={{ fileName: "meme-generator", format: "jpg", quality: 0.9 }}
      >
        <View id="canvas" style={styles.canvas}>
          <ImageBackground
            source={
              imageTemplate !== null
                ? dataCompose[imageTemplate]?.image
                : undefined
            }
            style={styles.imageTemplate}
          >
            {items.map((item, index) => (
              <Animated.View
                key={item.id}
                {...panResponders[index]?.panHandlers}
                style={[
                  {
                    transform: [
                      { translateX: pan[index].x },
                      { translateY: pan[index].y },
                      { scale: scale[index] },
                    ],
                  },
                  styles.canvasView,
                ]}
              >
                {item.type === "text" ? (
                  <BoxMoveView
                    active={item.active}
                    onDelete={() => deleteItem(index)}
                    onDuplicate={() => duplicateItem(index)}
                  >
                    <TextInput
                      editable={item.active}
                      value={item.text}
                      onChangeText={(text) => {
                        setItems((prevItems) => {
                          const newItems = [...prevItems];
                          newItems[index] = { ...newItems[index], text };
                          return newItems;
                        });
                      }}
                      multiline={true}
                      style={item.style}
                    />
                  </BoxMoveView>
                ) : (
                  <BoxMoveView
                    active={item.active}
                    onDelete={() => deleteItem(index)}
                    onDuplicate={() => duplicateItem(index)}
                  >
                    <Image
                      source={{ uri: item.source }}
                      style={{ width: item.width, height: item.height }}
                    />
                  </BoxMoveView>
                )}
              </Animated.View>
            ))}
          </ImageBackground>
        </View>
      </ViewShot>
      <View style={styles.viewButton}>
        <TouchableOpacity onPress={pickImage} style={styles.buttonAddImage}>
          <Text style={styles.textaAdd}>Add Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addText} style={styles.buttonAddText}>
          <Text style={styles.textaAdd}>Add Text</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={captureView} style={styles.buttonExportImage}>
        <Text style={styles.textaAdd}>Export Image</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

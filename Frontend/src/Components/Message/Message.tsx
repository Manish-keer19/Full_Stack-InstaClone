import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Message() {
  return (
    <View>
      <View>
        <Text>Left arraw</Text>
        <Text>Manish-keer19</Text>
        <Text>edit icons</Text>
      </View>
      <View>
        <Text>Search Input</Text>
      </View>
      <View>
        <View>
          <Text>Message</Text>
          <Text>Request</Text>
        </View>
        <View>
          <View>
            <Image
              source={{
                uri: "https://instagram.frpr5-1.fna.fbcdn.net/v/t39.30808-6/428697804_17894916617970143_1009941534155158833_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.frpr5-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=maYW8sLGBr0Q7kNvgHg6i3G&_nc_gid=d5d2b055491743c592c66cd6b42968f8&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzMxMTE2Mjc3MjIyOTUwMTY5NA%3D%3D.3-ccb7-5&oh=00_AYB3JRELmWF6AGLZVrI0yIS0KQRHjAxpajU6Y06riTpYfA&oe=671318FA&_nc_sid=7a9f4b",
              }}
            />
          </View>
          <View>
            <Text>Manish-keer19</Text>
            <Text>Mentioned you in a story</Text>
          </View>
          <Text>Camera icons</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

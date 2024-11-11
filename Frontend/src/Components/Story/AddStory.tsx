import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ListRenderItem,
  Alert,
} from "react-native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../Entryroute";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons";

type ImageAsset = {
  uri: string;
};

export default function AddStory() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isAlbumVisible, setIsAlbumVisible] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  const [file, setFile] = useState<object | null>();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [recentMedia, setRecentMedia] = useState<MediaLibrary.Asset[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [folders, setFolders] = useState<
    { id: string; title: string; firstImage: string | null }[]
  >([]);

  const [selectedText, setselectedText] = useState<string>("Recent");

  const fetchRecentMedia = async (firstImages: number = 60) => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      first: firstImages,
      sortBy: [["creationTime", false]],
    });
    setRecentMedia(media.assets);
  };

  const fetchFolders = async () => {
    const albums = await MediaLibrary.getAlbumsAsync();
    const folderWithImages = await Promise.all(
      albums.map(async (album) => {
        const albumMedia = await MediaLibrary.getAssetsAsync({
          album: album.id,
          mediaType: ["photo", "video"],
          first: 1,
        });
        return {
          id: album.id,
          title: album.title,
          firstImage: albumMedia.assets[0]?.uri || null,
        };
      })
    );
    setFolders(folderWithImages);
  };

  const fetchMediaFromFolder = async (folderId: string) => {
    const media = await MediaLibrary.getAssetsAsync({
      album: folderId,
      mediaType: ["photo", "video"],
      first: 50,
    });
    setFile(media.assets[0]);
    setRecentMedia(media.assets);
    setSelectedMedia(media.assets[0]?.uri);
    setMediaType(media.assets[0]?.mediaType === "video" ? "video" : "image");
  };

  const fetchAllVideos = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ["video"],
    });
    setRecentMedia(media.assets);
    setSelectedMedia(media.assets[0]?.uri);
    setMediaType("video");
  };

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (status === "granted") {
        await fetchRecentMedia();
        await fetchFolders();
      } else {
        Alert.alert(
          "Permission needed",
          "We need access to your media to proceed."
        );
      }
    })();
  }, []);

  const renderImageItem: ListRenderItem<ImageAsset> = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        hadleShareImgtoNextPage(item);
      }}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  const hadleShareImgtoNextPage = (item: any) => {
    console.log("item", item);

    navigation.navigate("CreateStory", { mediaData: item });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Entypo
          name="cross"
          color="white"
          size={34}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerText}>Add Post</Text>
        <AntDesign name="setting" color="white" size={34} />
      </View>

      {/* ScrollView for Icon Section */}
      <View style={styles.iconScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.iconContentContainer}
        >
          {[...Array(10)].map((_, i) => (
            <View key={i} style={styles.iconBox}>
              <Feather name="music" color="white" size={34} />
              <Text style={styles.iconText}>Music</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Camera and Photos Buttons */}
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.photosButton}
          onPress={() => {
            fetchFolders();
            setIsAlbumVisible(true);
          }}
        >
          <Text style={styles.buttonText}>{selectedText}</Text>
          <AntDesign name="down" color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Image Grid */}
      <FlatList
        data={recentMedia}
        numColumns={3}
        keyExtractor={(item) => item.uri}
        contentContainerStyle={styles.imageGrid}
        renderItem={renderImageItem}
      />

      {/* Album Modal */}
      {isAlbumVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.albumHeader}>
            <TouchableOpacity onPress={() => setIsAlbumVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.selectAlbumText}>Select Album</Text>
          </View>

          {/* Options for Recent, Photos, and Videos */}
          <View style={styles.albumOptions}>
            <TouchableOpacity
              style={styles.option}
              onPress={async () => {
                setIsAlbumVisible(false);
                fetchRecentMedia();
              }}
            >
              <FontAwesome5 name="photo-video" size={25} color="white" />
              <Text style={styles.optionText}>Recent</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setIsAlbumVisible(false);
                fetchRecentMedia(1000);
              }}
            >
              <MaterialIcons name="photo" size={25} color="white" />
              <Text style={styles.optionText}>Photos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setIsAlbumVisible(false);
                fetchAllVideos();
              }}
            >
              <FontAwesome5 name="photo-video" size={25} color="white" />
              <Text style={styles.optionText}>Videos</Text>
            </TouchableOpacity>
          </View>

          {/* Album List */}
          <FlatList
            numColumns={4}
            data={folders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: "25%" }}
                onPress={() => {
                  setselectedText(item.title);
                  fetchMediaFromFolder(item.id);
                  setIsAlbumVisible(false);
                }}
              >
                <Image
                  source={{ uri: item.firstImage }}
                  style={styles.galleryItem}
                />
                <Text style={styles.albumTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  galleryItem: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 5,
  },
  headerText: {
    color: "white",
    fontSize: 25,
  },
  iconScrollContainer: {
    marginBottom: 15,
  },
  iconContentContainer: {
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: "#212121",
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  iconText: {
    color: "white",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  cameraButton: {
    backgroundColor: "#f8b400",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  photosButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#212121",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginRight: 5,
  },
  imageGrid: {
    paddingHorizontal: 5,
  },
  image: {
    width: 120,
    height: 200,
    margin: 5,
    borderRadius: 10,
  },

  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#292929",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  albumHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cancelText: {
    color: "#fff",
    fontSize: 18,
  },
  selectAlbumText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  albumOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    color: "#fff",
    marginLeft: 10,
  },
  albumTitle: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

export default function AddPost() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [recentMedia, setRecentMedia] = useState<MediaLibrary.Asset[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [folders, setFolders] = useState<
    { id: string; title: string; firstImage: string | null }[]
  >([]);
  const [isalbumshow, setIsalbumshow] = useState(false);

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

  const fetchRecentMedia = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      first: 100,
      sortBy: [["creationTime", false]],
    });
    setRecentMedia(media.assets);
    setSelectedMedia(media.assets[0]?.uri);
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
      first: 50, // Fetch 20 items from folder
    });
    setRecentMedia(media.assets);
    setSelectedMedia(media.assets[0]?.uri); // Set the first image in the folder as default selected
  };

  const handleablumClick = (item: any) => {
    fetchMediaFromFolder(item.id);
    setIsalbumshow(false);
  };
  
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-forward" size={28} color="#3897f0" />
        </TouchableOpacity>
      </View>

      {/* Image Preview Section */}
      <View style={styles.imagePreviewContainer}>
        {selectedMedia ? (
          <Image source={{ uri: selectedMedia }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>
            Select an image or video from your gallery
          </Text>
        )}
      </View>

      {/* Recent Media Section */}
      <View style={styles.mediaContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsalbumshow(!isalbumshow)}
        >
          <Text style={styles.sectionTitle}>Recent Media</Text>
          <Entypo name="chevron-small-down" size={25} color={"white"} />
        </TouchableOpacity>
        <FlatList
          data={recentMedia}
          keyExtractor={(item) => item.id}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedMedia(item.uri)}>
              <Image source={{ uri: item.uri }} style={styles.galleryItem} />
            </TouchableOpacity>
          )}
        />
      </View>

      {isalbumshow && (
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}></View>

          <View style={styles.albumHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsalbumshow(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.selectAlbumText}>Select Album</Text>
          </View>

          <View style={styles.albumOptions}>
            <View style={styles.option}>
              <FontAwesome5 name="photo-video" size={25} color="white" />
              <Text style={styles.optionText}>Recent</Text>
            </View>
            <View style={styles.option}>
              <MaterialIcons name="photo" size={25} color="white" />
              <Text style={styles.optionText}>Photos</Text>
            </View>
            <View style={styles.option}>
              <FontAwesome5 name="photo-video" size={25} color="white" />
              <Text style={styles.optionText}>Videos</Text>
            </View>
          </View>

          <View style={styles.albumsSection}>
            <Text style={styles.albumsTitle}>Albums</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={4}
            data={folders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: "25%" }}
                onPress={() => {
                  handleablumClick(item);
                }}
              >
                <Image
                  source={{ uri: item.firstImage }}
                  style={styles.galleryItem}
                />
                <Text style={{ color: "white" }}>{item.title}</Text>
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
    backgroundColor: "#0d0d0d",
    paddingTop: 20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  iconButton: {
    padding: 5,
  },
  imagePreviewContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#212121",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageText: {
    color: "#fff",
    textAlign: "center",
  },
  mediaContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  galleryItem: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#292929",
    position: "absolute",
    zIndex: 10,
    top: 0,
    left: 0,
    paddingTop: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  modalHeader: {
    width: 60,
    height: 4,
    backgroundColor: "#f7f7f7",
    alignSelf: "center",
    marginBottom: 20,
  },
  albumHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelText: {
    color: "#fff",
    fontSize: 18,
  },
  selectAlbumText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  albumOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  option: {
    alignItems: "center",
    gap: 8,
  },
  optionText: {
    color: "#fff",
  },
  albumsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  albumsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#3897f0",
  },
});

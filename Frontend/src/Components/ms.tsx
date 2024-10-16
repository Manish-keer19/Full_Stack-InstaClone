import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

export default function AddPost() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaLibrary.Asset[]>([]);
  const [folders, setFolders] = useState<MediaLibrary.Album[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [recentItems, setRecentItems] = useState<MediaLibrary.Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  // Request permission and fetch media
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {
        await fetchMedia();
       await fetchFolders();
      } else {
        Alert.alert('Permission needed', 'We need access to your media to proceed.');
      }
    })();
  }, []);

  // Fetch recent media from user's device
  const fetchMedia = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'], // Fetch both images and videos
      first: 20, // Fetch recent 20 media items
      sortBy: [['creationTime', false]], // Sort by newest items
    });
     setRecentItems(media.assets);
    setSelectedMedia(media.assets[0]?.uri); // Set the first image as default selected
  };

  // Fetch folders (albums) where media is stored
  const fetchFolders = async () => {
    const albums = await MediaLibrary.getAlbumsAsync();
    setFolders(albums);
  };

  // Fetch media from a selected folder
  const fetchMediaFromFolder = async (folderId: string) => {
    const media = await MediaLibrary.getAssetsAsync({
      album: folderId,
      mediaType: ['photo', 'video'],
      first: 20, // Fetch 20 items from folder
    });
    setMediaItems(media.assets);
    setSelectedMedia(media.assets[0]?.uri); // Set the first image in the folder as default selected
  };

  // Handle media selection
  const handleSelectMedia = (uri: string) => {
    setSelectedMedia(uri);
  };

  // Handle folder selection from modal
  const handleSelectFolder = (folderId: string) => {
    fetchMediaFromFolder(folderId); // Fetch media for selected folder
    setIsModalVisible(false); // Close modal after selecting folder
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>Permission to access media was denied.</Text>
      </View>
    );
  }

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
          <Text style={styles.imageText}>Select an image or video from your gallery</Text>
        )}
      </View>

      {/* Recent Media Section */}
      <Text style={styles.sectionTitle}>Recent Media</Text>
      <FlatList
        data={recentItems}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectMedia(item.uri)}>
            <Image source={{ uri: item.uri }} style={styles.galleryItem} />
          </TouchableOpacity>
        )}
      />

      {/* Folder Modal Section */}
      <TouchableOpacity style={styles.openModalButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.openModalText}>Select Folder</Text>
      </TouchableOpacity>

      {/* Modal to display folders */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Folder</Text>
            <FlatList
              data={folders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.folderButton}
                  onPress={() => handleSelectFolder(item.id)}
                >
                  <Text style={styles.folderText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Gallery Grid to display images/videos from the selected folder */}
      <FlatList
        data={mediaItems}
        keyExtractor={(item) => item.id}
        numColumns={2} // Adjust the number of columns for grid view
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectMedia(item.uri)}>
            <Image source={{ uri: item.uri }} style={styles.galleryItem} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Background black
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  iconButton: {
    padding: 5,
  },
  imagePreviewContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginVertical: 15,
    borderRadius: 10,
  },
  imagePreview: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
  },
  imageText: {
    marginTop: 10,
    color: '#666',
  },
  galleryItem: {
    width: 100,
    height: 100,
    margin: 2,
    borderRadius: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  openModalButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  openModalText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  folderButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f7f7f7',
    marginVertical: 5,
    borderRadius: 5,
  },
  folderText: {
    fontSize: 16,
    color: '#000',
  },
  closeModalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#3897f0',
    marginTop: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

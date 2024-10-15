import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import FeatherIcons from "react-native-vector-icons/Feather";

export default function Message() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesignIcons name="arrowleft" color={"white"} size={30} />
        <Text style={styles.headerText}>Manish-keer19</Text>
        <FeatherIcons name="edit" color={"white"} size={30} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <AntDesignIcons name="search1" color={"#B0B0B0"} size={20} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#B0B0B0"}
          style={styles.searchInput}
        />
      </View>

      {/* Messages Section */}
      <ScrollView style={styles.messagesContainer}>
        {/* Messages Header */}
        <Text style={styles.sectionHeader}>Messages</Text>
        {/* Map through your message items */}
        {[...Array(10)].map((_, i) => (
          <View style={styles.messageItem} key={i}>
            <Image
              source={{
                uri: "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
              }}
              style={styles.userImage}
            />
            <View style={styles.messageDetails}>
              <Text style={styles.username}>Manish-keer19</Text>
              <Text style={styles.messageText}>Mentioned you in a story</Text>
            </View>
            <AntDesignIcons
              name="camera"
              color={"#B0B0B0"} // Changed to a lighter gray
              size={30}
              style={styles.cameraIcon}
            />
          </View>
        ))}

        {/* Requests Header */}
        <Text style={styles.sectionHeader}>Requests</Text>
        {/* Example Requests */}
        {[...Array(5)].map((_, i) => (
          <View style={styles.messageItem} key={`request-${i}`}>
            <Image
              source={{
                uri: "https://example.com/request_image.jpg", // Placeholder image URL for requests
              }}
              style={styles.userImage}
            />
            <View style={styles.messageDetails}>
              <Text style={styles.username}>New Request from User</Text>
              <Text style={styles.messageText}>Wants to connect with you</Text>
            </View>
            <AntDesignIcons
              name="user"
              color={"#B0B0B0"} // Changed to a lighter gray for requests
              size={30}
              style={styles.cameraIcon}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black for the overall background
    paddingTop: 40,
  },
  header: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#333333", // Darker border for the header
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600", // Bold for emphasis
  },
  searchBar: {
    backgroundColor: "#1F1F1F", // Dark grey for the search bar
    height: 50,
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
    marginLeft: 10,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  sectionHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#2A2A2A", // Darker message item background
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    color: "#ffffff", // White for username
  },
  messageText: {
    color: "#B0B0B0", // Light gray for message text
  },
  cameraIcon: {
    marginLeft: 10,
  },
});

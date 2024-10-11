import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Footer from "../Footer";
import Icons from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import {images} from "../../Utils/imagedata"

// const images = [
//   {
//     uri: "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
//   },
//   {
//     uri: "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.29350-15/351281344_591342016158105_2734150758211139879_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=PpsRFSDoW9IQ7kNvgFQWtUL&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzExODUxNDUwMTk1MTkwNzMyNQ%3D%3D.3-ccb7-5&oh=00_AYDSf1xB6mEYC7KF1JCpSOSaoWkliurUz4PIx77cywjGiA&oe=670EA85C&_nc_sid=7a9f4b",
//   },
//   {
//     uri: "https://instagram.fbho1-1.fna.fbcdn.net/v/t51.29350-15/458979119_1052529089727553_5583931975541233891_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEyNDcuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbho1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IpXNzLqvb5cQ7kNvgGqZMLV&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQ1MjYyMzU5MzQ0MjcxODI3MQ%3D%3D.3-ccb7-5&oh=00_AYD-wZ3gANeB6NvQpyQ6RIwHlMQQsFDbk21Akie8KffyvA&oe=670ED34B&_nc_sid=7a9f4b",
//   },
//   {
//     uri: "https://instagram.fbho1-3.fna.fbcdn.net/v/t51.29350-15/372218044_1012352613298788_8030487806128349739_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbho1-3.fna.fbcdn.net&_nc_cat=100&_nc_ohc=VBN_AmYEnBkQ7kNvgFxQz7Z&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzE4MTQ1ODEwMjk1MTkzODQwMg%3D%3D.3-ccb7-5&oh=00_AYBlT4Wh739IzLqk11xLvwpsRsi7TJ3HPMZwzCAkVQHd2w&oe=670ECA26&_nc_sid=7a9f4b",
//   },

//   {
//     uri: "https://instagram.fbho1-4.fna.fbcdn.net/v/t51.29350-15/272465633_640308743883572_8204290229680268011_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbho1-4.fna.fbcdn.net&_nc_cat=108&_nc_ohc=3cj_VICsIToQ7kNvgF3vBgL&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=Mjc1OTA2NzA3MjIyMTY1NTAxOQ%3D%3D.3-ccb7-5&oh=00_AYAMb0Xvtkj_k2357QQvKgMkLzpciozf_bCBbHC_0nJlsA&oe=670ECE48&_nc_sid=7a9f4b",
//   },
// ];

export default function Posts() {
  return (
    <View>
      <ScrollView style={styles.container}>
        {/* Post Container */}
        {images.map((item, i) => (
          <View style={styles.postContainer} key={i}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.profileInfo}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/manish19/image/upload/v1726505860/huur9oubvhlwi9sqw0go.jpg",
                  }}
                  style={styles.avatar}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.username}>Manish Keer</Text>
                  <Text style={styles.location}>Punash dem</Text>
                </View>
              </View>
              <Icons name="dots-three-vertical" color={"white"} size={20} />
            </View>

            {/* Post Image */}
            <View style={styles.postImageWrapper}>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={styles.postImage}
              />
            </View>

            {/* Like, Comment, Share, Save Section */}
            <View style={styles.actionIcons}>
              <View style={styles.leftIcons}>
                <Pressable>
                  <AntDesignIcon name="hearto" color={"white"} size={24} />
                </Pressable>
                <Pressable>
                  <FontAwesomeIcon name="comment-o" color={"white"} size={24} />
                </Pressable>
                <Pressable>
                  <FeatherIcon name="send" color={"white"} size={24} />
                </Pressable>
              </View>
              <Pressable>
                <FeatherIcon name="bookmark" color={"white"} size={24} />
              </Pressable>
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={styles.likesText}>1,024 likes</Text>
              <Text style={styles.postDescription}>
                <Text style={styles.username}>Manish Keer </Text>
                Enjoying the view! #travel #landscape
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "black",
    paddingTop: 50,
  },
  postContainer: {
    marginBottom: 20,
    borderColor: "#333",
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    justifyContent: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "gray",
    fontSize: 12,
  },
  postImageWrapper: {
    width: "100%",
    height: 400,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  leftIcons: {
    flexDirection: "row",
    gap: 15,
  },
  postInfo: {
    padding: 10,
  },
  likesText: {
    color: "white",
    fontWeight: "bold",
  },
  postDescription: {
    color: "white",
    marginTop: 5,
  },
});
``;

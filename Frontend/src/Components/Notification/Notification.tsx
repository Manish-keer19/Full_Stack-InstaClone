// import React from 'react';
// import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
// import AntDesignIcons from 'react-native-vector-icons/AntDesign';

// const notifications = [
//   {
//     id: 1,
//     type: 'follow',
//     username: 'JohnDoe',
//     time: 'Yesterday',
//     imageUri: 'https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b',
//   },
//   {
//     id: 2,
//     type: 'like',
//     username: 'JaneSmith',
//     time: '2 days ago',
//     imageUri: 'https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b',
//   },
//   {
//     id: 3,
//     type: 'follow',
//     username: 'AlexJohnson',
//     time: '3 days ago',
//     imageUri: 'https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b',
//   },
//   // You can add more notifications here as needed
// ];

// export default function Notification() {
//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <AntDesignIcons name="arrowleft" color="#FFFFFF" size={30} />
//         <Text style={styles.headerText}>Notifications</Text>
//       </View>

//       <ScrollView style={styles.notificationsContainer}>
//         {/* Notifications List */}
//         {notifications.map((notification) => (
//           <View style={styles.notificationItem} key={notification.id}>
//             <Image
//               source={{ uri: notification.imageUri }}
//               style={styles.userImage}
//             />
//             <View style={styles.notificationDetails}>
//               <Text style={styles.notificationText}>
//                 <Text style={styles.username}>{notification.username}</Text>{' '}
//                 {notification.type === 'follow'
//                   ? 'started following you'
//                   : 'liked your post'}
//               </Text>
//               <Text style={styles.timeText}>{notification.time}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000000', // Black background for the container
//     paddingTop: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#FFFFFF', // White text for header
//   },
//   notificationsContainer: {
//     flex: 1,
//     width:"100%",
//     // borderWidth:2,
//     // borderColor:"blue"
//     // backgroundColor: '#1F1F1F', // Dark gray background for notifications container
//   },
//   notificationItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#1F1F1F', // Dark gray background for notification item
//     borderRadius: 12,
//     padding: 15,
//     // marginBottom: 6,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 15,
//   },
//   notificationDetails: {
//     flex: 1,
//   },
//   notificationText: {
//     color: '#FFFFFF', // White text for notification message
//     fontSize: 16,
//   },
//   username: {
//     fontWeight: 'bold', // Bold for the username
//   },
//   timeText: {
//     color: '#B0B0B0', // Light gray for time text
//     fontSize: 12,
//     marginTop: 2,
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

// Sample notifications with a single post image and user image
const notifications = [
  {
    id: 1,
    type: "follow",
    username: "vishal Rajput",
    time: "Yesterday",
    imageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
    postImageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
  },
  {
    id: 2,
    type: "like",
    username: "Nilesh keer",
    time: "2 days ago",
    imageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
    postImageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
  },
  {
    id: 3,
    type: "follow",
    username: "prakhar rajput",
    time: "3 days ago",
    imageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
    postImageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
  },
  {
    id: 4,
    type: "like",
    username: "Manish keer",
    time: "4 days ago",
    imageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
    postImageUri:
      "https://instagram.fbho1-2.fna.fbcdn.net/v/t51.2885-19/461331682_472430802608818_3421248288983675499_n.jpg?_nc_ht=instagram.fbho1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=vrHwx345BOUQ7kNvgElnLd8&_nc_gid=fc3db61eeb4e41cb8b3f258080dff8e3&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCvqu5feO0OpfrFrURbO96rkz7Y_tvtutUcJRuLAly-Yg&oe=670EC499&_nc_sid=7a9f4b",
  },
  // Add more notifications as needed
];

export default function Notification() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => [navigation.navigate("Home")]}
        >
          <AntDesignIcons name="arrowleft" color="#FFFFFF" size={30} />
          <Text style={styles.headerText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsContainer}>
        {/* Notifications List */}
        {notifications.map((notification) => (
          <View style={styles.notificationItem} key={notification.id}>
            <Image
              source={{ uri: notification.imageUri }}
              style={styles.userImage}
            />
            <View style={styles.notificationDetails}>
              <Text style={styles.notificationText}>
                <Text style={styles.username}>{notification.username}</Text>{" "}
                {notification.type === "follow"
                  ? "started following you"
                  : "liked your post"}
              </Text>
              <Text style={styles.timeText}>{notification.time}</Text>
              {notification.type === "like" && (
                <View style={styles.postImageContainer}>
                  <Image
                    source={{ uri: notification.postImageUri }}
                    style={styles.postImage}
                  />
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black background for the container
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FFFFFF", // White color for the header text
  },
  notificationsContainer: {
    // paddingHorizontal: 20,
    // borderWidth:2,
    // borderColor:"gold"
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 10,
    // backgroundColor: "#333333", // Dark gray for the notification item
    borderRadius: 10,
    padding: 10,
    // borderWidth:2,
    // borderColor:"red"
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationDetails: {
    flex: 1,
    // borderWidth:2,
    // borderColor: "#FFFFFF",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  notificationText: {
    color: "#FFFFFF", // White color for notification text
  },
  username: {
    fontWeight: "bold",
  },
  timeText: {
    color: "#AAAAAA", // Light gray for the time text
    fontSize: 12,
  },
  postImageContainer: {
    marginTop: 10,
  },
  postImage: {
    width: 50, // Smaller width for post images
    height: 50, // Smaller height for post images
    // borderRadius: 10,
    resizeMode: "cover",
    marginRight: 10, // Spacing between images
  },
});

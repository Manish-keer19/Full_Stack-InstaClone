import apiClient from "./apiClient";

class UserService {
  async getUserData(data: any) {
    console.log("data in getuserdata userservice", data);
    try {
      const res = await apiClient.post("user/getuserFulldata", data);

      console.log("res.data is ", res.data);

      if (res.data.success) {
        console.log("data is ", res.data);
        // alert("user data fech succesfully");
        return res.data;
      } else {
        console.log("could not get the userdata");
      }
    } catch (error) {
      console.log("error", error);
      console.log("could not get the userdata", error);
    }
  }

  async serchUser(data: any) {
    console.log("data in getuserdata userservice", data);
    try {
      const res = await apiClient.post("/user/searchUsers", data);
      console.log("res.data is ", res.data);

      if (res.data.success) {
        console.log("data is ", res.data);
        // alert("user data fech succesfully");
        return res.data;
      } else {
        console.log("could not search the user");
        console.log("res.data is ", res.data);
      }
    } catch (error) {
      console.log("could not search the user ", error);
    }
  }

  async followeUser(data: any) {
    console.log("data in followuser userservice", data);
    try {
      const res = await apiClient.post("/user/followuser", data);

      console.log("res.data is ", res.data);
      if (res.data.success) {
        console.log("user followed successfully");
        return res.data;
      } else {
        console.log("could not follower the user");
        console.log("res.data is ", res.data);
      }
    } catch (error) {
      console.log("could not follower the user", error);
      // console.log("res is "error.response.data );
    }
  }
  async unfolloweUser(data: any) {
    console.log("data in followuser userservice", data);
    try {
      const res = await apiClient.post("/user/UnFollowUser", data);

      console.log("res.data is ", res.data);
      if (res.data.success) {
        console.log("user Unfollowed successfully");
        return res.data;
      } else {
        console.log("could not unfollower the user");
        console.log("res.data is ", res.data);
      }
    } catch (error) {
      console.log("could not unfollower the user", error);
      // console.log("res is "error.response.data );
    }
  }

  async createLike(data: any) {
    console.log("data in createLike userservice", data);
    try {
      const res = await apiClient.post("/like/createlike", data);
      console.log("res.data is ", res.data);
      if (res.data.success) {
        console.log("user liked successfully in userservice");
        return res.data;
      } else {
        console.log("could not like the user");
        console.log("res.data is ", res.data);
      }
    } catch (error) {
      console.log("could not like the user", error);
      // console.log("res is "error.response.data );
    }
  }

  async deleteLike(data: any) {
    console.log("data in createLike userservice", data);
    try {
      const res = await apiClient.post("/like/deleteLike", data);
      console.log("res.data is ", res.data);
      if (res.data.success) {
        console.log("like delete  successfully in userservice");
        return res.data;
      } else {
        console.log("could not like the user");
        console.log("res.data is ", res.data);
      }
    } catch (error) {
      console.log("could not like the user", error);
      // console.log("res is "error.response.data );
    }
  }
}

export const UserServiceInstance = new UserService();

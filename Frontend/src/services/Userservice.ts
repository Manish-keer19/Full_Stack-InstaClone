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
}

export const UserServiceInstance = new UserService();

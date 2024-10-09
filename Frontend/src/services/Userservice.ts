class UserService {
  async getUserData(data: any) {
    try {
      const response = await fetch(
        "http://192.168.218.139:3000/api/v1/user/getuserdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      if (res.success) {
        console.log("data is ", res);
        // alert("user data fech succesfully");
        return res;
      } else {
        console.log("could not get the userdata");
      }
    } catch (error) {
      console.log("error", error);
      console.log("could not get the userdata");
    }
  }

  async updateProfile(data: any) {
    console.log("data in updateprole userservice",data);
    try {
      const response = await fetch(
        "http://192.168.218.139:3000/api/v1/user/editProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      console.log("res of editprofile in userservice", res);
      if (res.success) {
        console.log("profile updated");
        return res;
      } else {
        console.log("could not update the profile");
      }
    } catch (error) {
      console.log("error", error);
      console.log("could not update the profile");
    }
  }
}

export const UserServiceInstance = new UserService();

// class AuthService {
//     // Define the types for the data parameter and return type
//     async Signup(data: object): Promise<any> {
//       try {
//         const res = await fetch("http://192.168.198.139:3000/api/v1/auth/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data), // Convert data to string
//         });

//         const result = await res.json(); // Rename to avoid conflict with the function argument `data`
//         console.log("Response data is ", result);

//         if (result.success) {
//           console.log("Signup completed");
//           return result;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         console.log("Could not signup, some error occurred");
//       }
//     }

//     // Define the types for the data parameter and return type
//     async generateOtp(data: object): Promise<any> {
//       try {
//         const res = await fetch("http://192.168.198.139:3000/api/v1/auth/generateOtp", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data), // Convert data to string
//         });

//         const result = await res.json(); // Rename to avoid conflict with the function argument `data`
//         console.log("Response data is ", result);

//         if (result.success) {
//           console.log("OTP generated");
//           return result;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         console.log("Could not generate OTP, some error occurred");
//       }
//     }
//   }

//   // Export the AuthService instance
//   export const AuthServiceInstance = new AuthService();

import apiClient from "./apiClient";
class AuthService {
  // Define the types for the data parameter and return type
  async Signup(data: object): Promise<any> {
    try {
      const res = await apiClient.post("/auth/signup", data); // Using apiClient with base URL

      console.log("res sign up is", res.data);

      if (res.data.success) {
        console.log("Signup completed");
        return res.data;
      }
    } catch (error) {
      console.log("could not create signup:", error);
      console.log("Could not signup, some error occurred");
    }
  }

  // Define the types for the data parameter and return type
  async generateOtp(data: object): Promise<any> {
    try {
      const res = await apiClient.post("/auth/generateOtp", data); // Using apiClient with base URL
      console.log("res of generate otp is ", res.data);
      if (res.data.success) {
        console.log("OTP generated");
        return res.data;
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Could not generate OTP, some error occurred");
    }
  }
}

// Export the AuthService instance
export const AuthServiceInstance = new AuthService();

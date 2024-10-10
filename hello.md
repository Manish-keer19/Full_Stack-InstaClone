# this md file contain how to add typscrip in you express and how to setup local storage in react native

# Creating a Node.js Backend with TypeScript

This guide provides step-by-step instructions to manually set up a Node.js backend using TypeScript, Express, and Mongoose.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- MongoDB (local instance or cloud via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Steps to Set Up Backend in TypeScript

### 1. Initialize the Project

First, create a new project directory and initialize the Node.js project.

```bash
mkdir backend-ts-project
cd backend-ts-project
npm init -y
```

**This will generate a package.json file.**

## 2. Install Dependencies

Production Dependencies

Express: Web framework for Node.js

Mongoose: MongoDB object modeling
Install them using the following command:

```
npm install express mongoose
```

### Development Dependencies

TypeScript: To enable TypeScript support.

ts-node: To run TypeScript code without pre-compiling it.

Nodemon: To automatically restart the server when code changes.

Type Definitions: To provide
TypeScript types for Express and Node.js.

Install them as dev dependencies:

```
npm install --save-dev typescript ts-node nodemon @types/express @types/node
```

## 3. Set Up TypeScript

Create a tsconfig.json file to configure TypeScript:

```
npx tsc --init
```

# how to setup local storage in react native

React Native, you don't have direct access to the browser's localStorage like you do in web development, but you can use several libraries that provide similar functionality for storing data locally. The most common approach is using AsyncStorage, which is built into React Native.

_Here’s how you can use AsyncStorage to set and retrieve local data in React Native:_

## 1. Install @react-native-async-storage/async-storage

First, you need to install the package if it's not already part of your project.

```
npm install @react-native-async-storage/async-storage
```

## 2. Using AsyncStorage

Here’s an example of how to use it:

### a. To store data:

```
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data successfully saved");
  } catch (e) {
    console.error("Failed to save the data to the storage", e);
  }
};
```

### b. To retrieve data:

```
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Data retrieved successfully: ", value);
      return value;
    }
  } catch (e) {
    console.error("Failed to fetch the data from storage", e);
  }
};
```

### c. To remove data:

```
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully");
  } catch (e) {
    console.error("Failed to remove the data", e);
  }
};
```

# 3. Example Usage

Here’s how you might use these functions in a React Native component:

```
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const saveUserData = () => {
    storeData('username', 'manishkeer');
  };

  const getUserData = async () => {
    const username = await getData('username');
    console.log("Stored username: ", username);
  };

  const removeUserData = () => {
    removeData('username');
  };

  return (
    <View>
      <Button title="Save Data" onPress={saveUserData} />
      <Button title="Get Data" onPress={getUserData} />
      <Button title="Remove Data" onPress={removeUserData} />
    </View>
  );
};

export default App;
```

This example demonstrates how to set, get, and remove data from local storage in React Native using AsyncStorage.

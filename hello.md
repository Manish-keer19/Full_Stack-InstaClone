# this md file contain how to add typscrip in you express

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

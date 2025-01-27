# backend_Insta

This project is a Node.js backend developed with TypeScript for an Instagram-like application. The backend provides API endpoints for handling authentication, user posts, comments, and more.

## Deployment on Render

To deploy this backend on Render, follow these steps.

### Prerequisites

- A [Render](https://render.com/) account (free for personal projects).
- A linked GitHub account with the repository [backend_Insta](https://github.com/Manish-keer19/backend_Insta).

### Step-by-Step Deployment

#### 1. Set Up Your Render Account

1. Go to [Render](https://render.com/), sign up, and log in.
2. Once logged in, click on **New +** > **Web Service** to create a new web service.

#### 2. Connect Your GitHub Repository

1. Link your GitHub account to Render to access repositories.
2. Find your repository `backend_Insta` and select it to proceed.

#### 3. Configure Project Settings

Render will automatically detect the project as a Node.js application, but you can set it up manually with the following configurations:

- **Name**: Choose a name for the service, e.g., `insta-backend`.
- **Environment**: Select `Node`.
- **Build Command**: Since this is a TypeScript project, use:
  ```
  npm install && npm run build
  ```

 ### 4. start Command: Assuming the compiled JavaScript files go into a dist folder, set:
```
node dist/index.js 
```
- Adjust dist/index.js to the path of your main file if different.



#### 4. Set Environment Variables
- Go to the Environment tab in Render's settings for your service.
Add the necessary environment variables required by your app, such as:
DB_URI: MongoDB connection string
PORT: Port for the server (e.g., 3000)
JWT_SECRET: Secret for JWT authentication
(Add any other environment variables your app requires)
Click Add Environment Variable and input each key-value pair.

4. Set Environment Variables
Go to the Environment tab in Render's settings for your service.
Add the necessary environment variables required by your app, such as:
DB_URI: MongoDB connection string
PORT: Port for the server (e.g., 3000)
JWT_SECRET: Secret for JWT authentication
(Add any other environment variables your app requires)
Click Add Environment Variable and input each key-value pair.
5. Deploy the Project
Click Create Web Service to start the deployment.
Render will automatically install dependencies, build the project, and deploy it.
6. Test Your API Endpoints
Once deployed, Render will provide a live URL for your backend, for example, https://insta-backend.onrender.com.
Test your API endpoints with the new URL to ensure everything works as expected.
Updating Your Deployment
Every time you push changes to the GitHub repository, Render will automatically redeploy with the latest code. This makes it easy to manage updates and maintain the service.

Alternative Deployment Options
If you prefer to use other platforms, consider these alternatives:

Vercel
You may need to add a vercel.json file to configure the project to work as an API backend on Vercel.
Follow similar steps as above, configuring environment variables and setting build commands in Vercel's settings.
Railway
Set up a Railway account, link your GitHub repository, and configure environment variables as described above.
Railway will automatically handle the deployment process once configured.
Project Structure
Briefly describe the structure of your project if needed.

License
This project is licensed under the MIT License.

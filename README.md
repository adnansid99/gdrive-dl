
# G-Drive Direct Url Generator

This React project focuses on enhancing user experience by converting standard Google Drive URLs into direct download links with resumable capabilities. When users provide a Google Drive link, the application processes the link and generates a modified URL that allows for seamless and resumable downloads. This functionality is particularly useful for large files or unstable network conditions, ensuring users can pause and resume downloads without losing progress.

## Setting up Environment Variables

To run this project successfully, you need to add the following environment variables to your `.env` file. Follow the steps below to obtain the required Google Drive API key from the Google Cloud Console:

### 1. Visit the Google Cloud Console:

- Go to [console.cloud.google.com](https://console.cloud.google.com/).
- If you don't have an account, sign up and create a new project.

### 2. Create a New Project:

- In the Google Cloud Console, navigate to the project selection dropdown.
- Click on "New Project" and follow the prompts to create a new project.

### 3. Enable the Google Drive API:

- In your project dashboard, go to the "APIs & Services" > "Dashboard" section.
- Click on the "+ ENABLE APIS AND SERVICES" button.
- Search for "Google Drive API" and enable it for your project.

### 4. Create API Credentials:

- In the Google Cloud Console, go to "APIs & Services" > "Credentials."
- Click on "Create Credentials" and choose "API key."

### 5. Copy the API Key:

- Once created, copy the generated API key.

### 6. Update your .env file:

- In your project's root directory, find or create a `.env` file.
- Add the following line, replacing `VITE_GDRIVE_API` with the actual API key you obtained:

  ```env
  VITE_GDRIVE_API=AIzaSyCnFak3Ex4mP1e_F4K3_API_K3y

## Run Locally

Clone the project

```bash
  git clone https://github.com/adnansid99/gdrive-dl
```

Go to the project directory

```bash
  cd gdrive-dl
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Authors

- [Adnan Siddiqui](https://www.github.com/adnansid99)


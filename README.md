# Shippex 🚚

This is a simple shipment tracking app created with [Expo](https://expo.dev) , which allows drivers to manage their shipment status.

## Features:

1. Splash Screen: 

- a splash screen with animation based on the provided Figma file

2. Login Screen: 

- a login screen with validation as required.
- Include fields for username/email and password.

3. Shipment List Screen: 

- a list of shipments with their status (Received, Canceled, etc.).
- Used  flat list to display the shipments.
- pull-to-refresh functionality.
- search for shipment by barcode
- filter the shipment based on the shipment status

4. Dark Mode
-All screens dark mode are implemented, Just switch your mobile phone settings to dark mode to see the beauty ☺️

5. State Management
- state was managed with 

## Technologies 🛠️

- expo
- @gorhom/bottom-sheet
- axios
- RTK Query
- react-hook-form
- react-native-toast-message



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

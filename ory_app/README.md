#  Flutter app using ORY Kratos for authentication

Flutter frontend app used to show how ORY Cloud and ORY Kratos works. 

## Getting Started

- Download flutter SDK https://flutter.dev/docs/get-started/install/macos and follow the steps to add it to your path.
- Download Android Studio https://developer.android.com/studio?gclid=CjwKCAjwwsmLBhACEiwANq-tXGIgJLZR_fVNXyD53osF2pqwJTFRdI5BxNGDOOEFaYNbt9V1tjiBJxoC_CMQAvD_BwE&gclsrc=aw.ds
- Install Android SDK and command line via Android Studio: open Android Studio => configure => sdk manager 
1. SDK Platforms => select Android API 31
2. SDK Tools => select Andoid SDK Build Tools 31, Command Line Tools, Platform Tools. 
3. Now you need to accept licenses. You need a folder where Android SDK was installed. Typically it is ~/Library/Android. Navigate to the folder wwhich contains cmd line tools and accept all licenses in terminal:
  
```console
cd  ~/Library/Android/sdk/cmdline-tools/latest/bin /.sdkmanager --licenses
``` 
- Create android simulator: go to Android studio, press configure => AVD manager => create virtual device => select device 
- As system image select the one that supports API level 31. 
- Install, then choose Hardware in Graphics.
- launch the emulator

Now you are done with setting up.

- Open app directory in VS Code and run in terminal
```console
flutter run 
``` 


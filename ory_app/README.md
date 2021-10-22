# ory_app

Flutter frontend app used to show how ORY Cloud and ORY Kratos works. 

## Getting Started

There are two ways to get you started:

install flutter locally or mount app folder into docker container. It's preferable to use local installation as this way would be described in the blog post.
## if using Docker container 
- Use this tutorial https://github.com/amorevino/operations/blob/master/tutorials/dev/app/docker-and-flutter-app-installation.md 
- As we don't have any dev or prod modes, you have to skip --flavor in the last command.

## Installing locally
- Download flutter SDK https://flutter.dev/docs/get-started/install/macos and follow the steps to add it to your path.
- Download Android Studio https://developer.android.com/studio?gclid=CjwKCAjwwsmLBhACEiwANq-tXGIgJLZR_fVNXyD53osF2pqwJTFRdI5BxNGDOOEFaYNbt9V1tjiBJxoC_CMQAvD_BwE&gclsrc=aw.ds
- Install Android SDK and command line via Android studio: open Android Studio => configure => sdk manager 
1. SDK Platforms => select Android API 31
2. SDK Tools => select Andoid SDK Build Tools 31, Command Line Tools, Platform Tools and Intel x86 Emulator Eccelerator. 
3. Now you need to accept licenses. You need a folder where Android SDK was installed. Typically it is ~/Library/Android. Navigate to the folder wwhich contains cmd line tools and accept all licenses in terminal:
  
```console
cd  ~/Library/Android/sdk/cmdline-tools/latest/bin /.sdkmanager --licenses
``` 
- Create android simulator: go to Android studio, press configure => AVD manager => create virtual device => select device 
- As system image select the one that supports API level 30. 
- Install, then choose Hardware in Graphics.

Now you are done with setting up.

- navigate to app folder and run in terminal
```console
flutter run 
``` 


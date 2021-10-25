import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:ory_app/app.dart';
import 'package:ory_app/bloc/auth_bloc.dart';
import 'package:ory_app/services/auth_service.dart';
import 'package:ory_app/storage.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  final secureStorage = SecureStorage();
  final authService = AuthService();
  runApp(BlocProvider(
    create: (context) =>
        AuthBloc(secureStorage: secureStorage, authService: authService)
          ..add(StartApp()),
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  static Map<int, Color> pinkColor = {
    50: const Color.fromRGBO(252, 117, 137, .1),
    100: const Color.fromRGBO(252, 117, 137, .2),
    200: const Color.fromRGBO(252, 117, 137, .3),
    300: const Color.fromRGBO(252, 117, 137, .4),
    400: const Color.fromRGBO(252, 117, 137, .5),
    500: const Color.fromRGBO(252, 117, 137, .6),
    600: const Color.fromRGBO(252, 117, 137, .7),
    700: const Color.fromRGBO(252, 117, 137, .8),
    800: const Color.fromRGBO(252, 117, 137, .9),
    900: const Color.fromRGBO(252, 117, 137, 1),
  };

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: const AppWrapper(),
        theme: ThemeData(
          primarySwatch: MaterialColor(0xFFFC7589, pinkColor),
        ));
  }
}

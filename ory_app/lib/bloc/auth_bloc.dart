import 'dart:async';
import 'package:flutter/widgets.dart';
import 'package:equatable/equatable.dart';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:ory_app/exceptions.dart';
import 'package:ory_app/services/auth_service.dart';
import 'package:ory_app/storage.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final SecureStorage secureStorage;
  final AuthService authService;

  AuthBloc({required this.secureStorage, required this.authService})
      : super(const AuthUninitialized());

  @override
  Stream<AuthState> mapEventToState(AuthEvent event) async* {
    if (event is StartApp) {
      yield* _startApp();
    } else if (event is InitLoginFlow) {
      yield* _initLoginFlow();
    } else if (event is InitRegistrationFlow) {
      yield* _initRegistrationFlow();
    } else if (event is ChangeField) {
      yield* _changeField(event);
    } else if (event is SignIn) {
      yield* _signIn(event);
    } else if (event is SignUp) {
      yield* _signUp(event);
    } else if (event is SignOut) {
      yield* _signOut(event);
    }
  }

  Stream<AuthState> _startApp() async* {
    try {
      if (await secureStorage.hasToken()) {
        final sessionToken = await secureStorage.getToken();
        final userInfo = await authService.getCurrentSession(sessionToken!);

        yield AuthAuthenticated(
            email: userInfo["email"], id: userInfo["id"], token: sessionToken);
      } else {
        yield const AuthUnauthenticated();
      }
    } on UnauthorizedException catch (_) {
      await SecureStorage().deleteToken();
      yield const AuthUnauthenticated();
    } catch (e) {
      yield const AuthUninitialized();
    }
  }

  Stream<AuthState> _initLoginFlow() async* {
    final currentState = state;
    try {
      yield AuthLoading();

      final flowId = await authService.initiateLoginFlow();

      yield AuthLoginInitialized(flowId: flowId);
    } on UnknownException catch (e) {
      if (currentState is AuthRegistrationInitialized) {
        yield AuthRegistrationInitialized(
            flowId: currentState.flowId,
            email: currentState.email,
            password: currentState.password,
            message: e.message);
      } else {
        yield AuthUninitialized(e.message);
      }
    } catch (_) {
      if (currentState is AuthRegistrationInitialized) {
        yield AuthRegistrationInitialized(
            flowId: currentState.flowId,
            email: currentState.email,
            password: currentState.password,
            message: "An error occured. Try again later.");
      } else {
        yield const AuthUninitialized("An error occured. Try again later.");
      }
    }
  }

  Stream<AuthState> _initRegistrationFlow() async* {
    try {
      yield AuthLoading();

      final flowId = await authService.intiateRegistrationFlow();

      yield AuthRegistrationInitialized(flowId: flowId);
    } on UnknownException catch (e) {
      final currentState = state as AuthLoginInitialized;
      yield AuthLoginInitialized(
          flowId: currentState.flowId,
          email: currentState.email,
          password: currentState.password,
          message: e.message);
    } catch (_) {
      final currentState = state as AuthLoginInitialized;
      yield AuthLoginInitialized(
          flowId: currentState.flowId,
          email: currentState.email,
          password: currentState.password,
          message: "An error occured. Try again later.");
    }
  }

  Stream<AuthState> _signIn(SignIn event) async* {
    try {
      yield AuthLoading();
      final sessionToken =
          await authService.signIn(event.flowId, event.email, event.password);
      await secureStorage.persistToken(sessionToken);
      final userInfo = await authService.getCurrentSession(sessionToken);
      yield AuthAuthenticated(
          email: userInfo["email"], id: userInfo["id"], token: sessionToken);
    } on InvalidCredentialsException catch (e) {
      yield AuthLoginInitialized(
          flowId: event.flowId,
          email: event.email,
          emailError: e.errors["traits.email"] ?? "",
          password: event.password,
          passwordError: e.errors["password"] ?? "",
          generalError: e.errors["general"] ?? "");
    } on UnknownException catch (e) {
      yield AuthLoginInitialized(
          flowId: event.flowId,
          email: event.email,
          password: event.password,
          message: e.message);
    } catch (_) {
      yield AuthLoginInitialized(
          flowId: event.flowId,
          email: event.email,
          password: event.password,
          message: "An Error occured. Please try again later.");
    }
  }

  Stream<AuthState> _signUp(SignUp event) async* {
    try {
      yield AuthLoading();

      final sessionToken =
          await authService.signUp(event.flowId, event.email, event.password);
      await secureStorage.persistToken(sessionToken);
      final userInfo = await authService.getCurrentSession(sessionToken);
      yield AuthAuthenticated(
          email: userInfo["email"], id: userInfo["id"], token: sessionToken);
    } on InvalidCredentialsException catch (e) {
      yield AuthRegistrationInitialized(
          //save auth errors
          flowId: event.flowId,
          email: event.email,
          emailError: e.errors["traits.email"] ?? "",
          password: event.password,
          passwordError: e.errors["password"] ?? "",
          generalError: e.errors["general"] ?? "");
    } on UnauthorizedException catch (_) {
      yield const AuthUnauthenticated(); //navigate to sign in page when session token invalid
    } on UnknownException catch (e) {
      yield AuthLoginInitialized(
          flowId: event.flowId,
          email: event.email,
          password: event.password,
          message: e.message);
    } catch (e) {
      yield AuthRegistrationInitialized(
          flowId: event.flowId,
          email: event.email,
          password: event.password,
          message: "An Error occured. Please try again later.");
    }
  }

  Stream<AuthState> _changeField(ChangeField event) async* {
    if (state is AuthRegistrationInitialized) {
      final currentState = state as AuthRegistrationInitialized;
      yield event.field == "password"
          ? AuthRegistrationInitialized(
              flowId: currentState.flowId,
              email: currentState.email,
              emailError: currentState.emailError,
              password: event.value)
          : AuthRegistrationInitialized(
              flowId: currentState.flowId,
              email: event.value,
              password: currentState.password,
              passwordError: currentState.passwordError);
    } else {
      final currentState = state as AuthLoginInitialized;
      yield event.field == "password"
          ? AuthLoginInitialized(
              flowId: currentState.flowId,
              email: currentState.email,
              emailError: currentState.emailError,
              password: event.value)
          : AuthLoginInitialized(
              flowId: currentState.flowId,
              email: event.value,
              password: currentState.password,
              passwordError: currentState.passwordError);
    }
  }

  Stream<AuthState> _signOut(SignOut event) async* {
    final currentState = state as AuthAuthenticated;
    try {
      yield AuthLoading();
      await AuthService().signOut();
      yield const AuthUnauthenticated();
    } on UnknownException catch (e) {
      yield AuthAuthenticated(
          email: currentState.email,
          id: currentState.id,
          token: currentState.token,
          message: e.message);
    } catch (_) {
      yield AuthAuthenticated(
          email: currentState.email,
          id: currentState.id,
          token: currentState.token,
          message: "An error occured. Please try again later.");
    }
  }
}

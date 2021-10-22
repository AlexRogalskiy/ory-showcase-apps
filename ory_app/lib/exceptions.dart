class UnauthorizedException implements Exception{} // session token is invalid

class InvalidCredentialsException implements Exception { // invalid credentials when sign in/sign up
  final Map<String, String> errors;

  InvalidCredentialsException(this.errors);
} 


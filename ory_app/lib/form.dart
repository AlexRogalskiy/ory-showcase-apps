class AuthForm  {
  final String email;
  final String password;

  AuthForm([email, password]) : this.email = email ?? "", this.password = password ?? "";
}
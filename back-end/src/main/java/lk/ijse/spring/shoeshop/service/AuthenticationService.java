package lk.ijse.spring.shoeshop.service;


import lk.ijse.spring.shoeshop.auth.request.SignInRequest;
import lk.ijse.spring.shoeshop.auth.request.SignUpRequest;
import lk.ijse.spring.shoeshop.auth.response.JwtAuthResponse;

public interface AuthenticationService {
    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);
}

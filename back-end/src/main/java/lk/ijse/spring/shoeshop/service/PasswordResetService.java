package lk.ijse.spring.shoeshop.service;

public interface PasswordResetService {

     void sendResetEmail(String email);

     void sendEmail(String to, String link);

    void resetPassword(String token);
    void saveNewPassword(String token,String newPassword);
}

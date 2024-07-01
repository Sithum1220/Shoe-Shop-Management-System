package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.entity.User;
import lk.ijse.spring.shoeshop.repository.UserRepository;
import lk.ijse.spring.shoeshop.service.PasswordResetService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void sendResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = RandomStringUtils.randomNumeric(6);
        user.setResetToken(token);
        user.setTokenExpiration(LocalDateTime.now().plusMinutes(10)); // token valid for 1 hour
        userRepository.save(user);

        sendEmail(user.getEmail(), token);
    }

    @Override
    public void sendEmail(String to, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("Your Verification Code Valid for 10 min: " + link);
        mailSender.send(message);
    }

    @Override
    public void resetPassword(String token) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification code provided, please try again."));

        if (user.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("verification code expired!");
        }

    }

    @Override
    public void saveNewPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification code provided, please try again."));

        if (user.isActiveStatus()) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setTokenExpiration(null);
            userRepository.save(user);
        }else {
            throw new IllegalArgumentException("Sorry! Can't reset your password.");
        }
    }
}

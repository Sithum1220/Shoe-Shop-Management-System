package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/reset_password")
@CrossOrigin
@RequiredArgsConstructor
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

//    @PostMapping("/request-password-reset/{email}")
//    public ResponseEntity<String> requestPasswordReset(@PathVariable("email") String email) {
//        passwordResetService.sendResetEmail(email);
//        return ResponseEntity.ok("Password reset email sent");
//    }
//
//    @PostMapping("/reset-password")
//    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String newPassword) {
//        passwordResetService.resetPassword(token, newPassword);
//        return ResponseEntity.ok("Password successfully reset");
//    }
}

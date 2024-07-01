package lk.ijse.spring.shoeshop.api;

import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.spring.shoeshop.auth.request.SignInRequest;
import lk.ijse.spring.shoeshop.auth.request.SignUpRequest;
import lk.ijse.spring.shoeshop.auth.response.JwtAuthResponse;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;
import lk.ijse.spring.shoeshop.service.AuthenticationService;
import lk.ijse.spring.shoeshop.service.EmployeeService;
import lk.ijse.spring.shoeshop.service.PasswordResetService;
import lk.ijse.spring.shoeshop.service.UserService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;

    private final AuthenticationService authenticationService;
    @Autowired
    private PasswordResetService passwordResetService;


    @PostMapping("/request-password-reset/{email}")
    public ResponseEntity<String> requestPasswordReset(@PathVariable("email") String email) {
        passwordResetService.sendResetEmail(email);
        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token) {
        passwordResetService.resetPassword(token);
        return ResponseEntity.ok("Password successfully reset");
    }

    @PostMapping("/save-password")
    public ResponseEntity<String> saveNewPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordResetService.saveNewPassword(token, newPassword);
        return ResponseEntity.ok("Password successfully reset");
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "active/{activeStatus}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getUsersByActiveStatus(@PathVariable("activeStatus") boolean activeStatus) {
        System.out.println("getUsersByActiveStatus");
        return new ResponseUtil("200", "Successfully Fetched Employees", userService.findAllByActiveStatus(activeStatus));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(path = "/{id}")
    public ResponseUtil deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
        return new ResponseUtil("200", "Successfully Deleted!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") String id) {
        Optional<UserDTO> optionalImageEntity = Optional.ofNullable(userService.getUser(id));
        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchUsers(@ModelAttribute("idOrName") String idOrName, @ModelAttribute("activeStatus") boolean activeStatus) {
        return new ResponseUtil("200", "Successfully Fetched Employees", userService.searchUsersById(idOrName, activeStatus));

    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(employeeService.lastId(), "E00"));
    }


    @PostMapping("/signin")
    public ResponseEntity<JwtAuthResponse> signIn(
            @RequestBody SignInRequest signInRequest) {

        return ResponseEntity.ok(
                authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(
            @RequestBody SignUpRequest signUpRequest) {
        System.out.println("signUp");
        return ResponseEntity.ok(
                authenticationService.signUp(signUpRequest));
    }

    @GetMapping("/search/{email}")
    public void getRoles(@PathVariable("email") String email) {

    }
}

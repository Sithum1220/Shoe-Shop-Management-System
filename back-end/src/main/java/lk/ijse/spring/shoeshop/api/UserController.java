package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;
import lk.ijse.spring.shoeshop.service.UserService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "active/{activeStatus}",produces = MediaType.APPLICATION_JSON_VALUE)
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
    public ResponseUtil searchUsers(@ModelAttribute("idOrName") String idOrName,@ModelAttribute("activeStatus") boolean activeStatus) {
        return new ResponseUtil("200", "Successfully Fetched Employees", userService.searchUsersById(idOrName,activeStatus));

    }
}

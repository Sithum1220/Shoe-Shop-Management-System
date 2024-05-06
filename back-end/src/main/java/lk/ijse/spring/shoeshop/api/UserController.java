package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.service.UserService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
}

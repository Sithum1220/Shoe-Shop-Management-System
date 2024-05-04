package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.service.EmployeeService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/employees")
@CrossOrigin
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getNewId() {

        return new ResponseUtil("200","Successfully Generated New Id",GenerateNewId.nextId(employeeService.lastId(), "E00"));

    }
}

package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
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
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(employeeService.lastId(), "E00"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody EmployeeDTO employee) {
        System.out.println("hellow");
        System.out.println(employee.toString());
        employeeService.saveEmployee(employee);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }
}

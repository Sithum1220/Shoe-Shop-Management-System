package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.service.EmployeeService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/employees")
@CrossOrigin
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
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

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getEmployees() {
        return new ResponseUtil("200", "Successfully Fetched Employees", employeeService.getAllEmployees());
    }

//    @GetMapping("/count")
//    public ResponseUtil getEmployeesCount() {
//        System.out.println("jjeee");
//        return new ResponseUtil("200", "Successfully Fetched Employee Count", employeeService.countEmployee());
//    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getImageById(@PathVariable("id") String id) {
        Optional<EmployeeDTO> optionalImageEntity = Optional.ofNullable(employeeService.getEmployee(id));
        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

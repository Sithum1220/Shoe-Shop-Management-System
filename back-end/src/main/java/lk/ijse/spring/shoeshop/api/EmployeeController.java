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

import java.util.List;
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
    public ResponseUtil saveEmployee(@RequestBody EmployeeDTO employee) {
        System.out.println("hellow");
        employeeService.saveEmployee(employee);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }

//    @ResponseStatus(HttpStatus.CREATED)
//    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil getEmployees() {
//        return new ResponseUtil("200", "Successfully Fetched Employees", employeeService.getAllEmployees());
//    }

//    @GetMapping("/count")
//    public ResponseUtil getEmployeesCount() {
//        System.out.println("jjeee");
//        return new ResponseUtil("200", "Successfully Fetched Employee Count", employeeService.countEmployee());
//    }

    @ResponseStatus(HttpStatus.CREATED)
    @PatchMapping
    public ResponseUtil updateEmployee(@RequestBody EmployeeDTO employee) {
        employeeService.updateEmployee(employee);
        return new ResponseUtil("200", "Successfully Updated!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") String id) {
        Optional<EmployeeDTO> optionalImageEntity = Optional.ofNullable(employeeService.getEmployee(id));

        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("byEmail/{id}")
    public ResponseUtil getEmployeeByEmail(@PathVariable("id") String id) {
            return new ResponseUtil("200", "Successfully Fetched!", employeeService.getEmployeeByEmail(id));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(path = "/{id}")
    public ResponseUtil deleteEmployee(@PathVariable("id") String id) {
        employeeService.deleteEmployee(id);
        return new ResponseUtil("200", "Successfully Deleted!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchEmployees(@ModelAttribute("idOrName") String idOrName,@ModelAttribute("activeStatus") boolean activeStatus) {
        return new ResponseUtil("200", "Successfully Fetched Employees", employeeService.searchEmployeesById(idOrName,activeStatus));

    }
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "active/{activeStatus}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getEmployeeByActiveStatus(@PathVariable("activeStatus") boolean activeStatus) {
        System.out.println("getEmployeeByActiveStatus");
        return new ResponseUtil("200", "Successfully Fetched Employees", employeeService.findAllByActiveStatus(activeStatus));

    }
}

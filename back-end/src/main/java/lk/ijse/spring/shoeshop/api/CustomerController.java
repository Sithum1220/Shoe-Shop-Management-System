package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.service.CustomerService;
import lk.ijse.spring.shoeshop.service.SupplierService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(customerService.lastId(), "C00"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.saveCustomer(customerDTO);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getEmployees() {
        return new ResponseUtil("200", "Successfully Fetched Employees", customerService.getAllCustomers());
    }
}

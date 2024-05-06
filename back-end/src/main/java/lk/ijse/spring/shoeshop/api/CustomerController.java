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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
    public ResponseUtil getCustomers() {
        return new ResponseUtil("200", "Successfully Fetched Employees", customerService.getAllCustomers());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomersById(@PathVariable("id") String id) {
        Optional<CustomerDTO> optionalImageEntity = Optional.ofNullable(customerService.getCustomer(id));
        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PatchMapping
    public ResponseUtil updateCustomers(@RequestBody CustomerDTO customerDTO) {
        customerService.updateCustomer(customerDTO);
        return new ResponseUtil("200", "Successfully Updated!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(path = "/{id}")
    public ResponseUtil deleteCustomers(@PathVariable("id") String id) {
        customerService.deleteCustomer(id);
        return new ResponseUtil("200", "Successfully Deleted!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(params = "idOrName",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomers(@RequestParam("idOrName") String idOrName) {
        return new ResponseUtil("200", "Successfully Fetched Customers", customerService.searchCustomersById(idOrName));

    }
}

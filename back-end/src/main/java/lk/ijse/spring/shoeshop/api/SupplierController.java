package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.service.SupplierService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/supplier")
@CrossOrigin
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(supplierService.lastId(), "S00"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveSupplier(@RequestBody SupplierDTO supplierDTO) {
        supplierService.saveSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getEmployees() {
        return new ResponseUtil("200", "Successfully Fetched Employees", supplierService.getAllSuppliers());
    }

}

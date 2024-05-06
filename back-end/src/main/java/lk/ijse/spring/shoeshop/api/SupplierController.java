package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.service.SupplierService;
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
    public ResponseUtil getSuppliers() {
        return new ResponseUtil("200", "Successfully Fetched Employees", supplierService.getAllSuppliers());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> getSuppliersById(@PathVariable("id") String id) {
        Optional<SupplierDTO> optionalImageEntity = Optional.ofNullable(supplierService.getSupplier(id));
        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PatchMapping
    public ResponseUtil updateSuppliers(@RequestBody SupplierDTO supplierDTO) {
        supplierService.updateSupplier(supplierDTO);
        return new ResponseUtil("200", "Successfully Updated!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping(path = "/{id}")
    public ResponseUtil deleteSuppliers(@PathVariable("id") String id) {
        supplierService.deleteSupplier(id);
        return new ResponseUtil("200", "Successfully Deleted!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(params = "idOrName",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchSuppliers(@RequestParam("idOrName") String idOrName) {
        return new ResponseUtil("200", "Successfully Fetched Suppliers", supplierService.searchSuppliersById(idOrName));

    }
}

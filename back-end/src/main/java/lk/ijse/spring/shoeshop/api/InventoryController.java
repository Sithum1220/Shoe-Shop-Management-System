package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.service.InventoryService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/inventory")
@CrossOrigin
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/status")
    public ResponseUtil checkStatus(@RequestBody InventoryDTO inventoryDTO) {
        System.out.println("save inventory");
        return new ResponseUtil("200", "Successfully Saved!", inventoryService.checkStatus(inventoryDTO));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/supplier")
    public ResponseUtil checkSupplier(@RequestBody InventoryDTO inventoryDTO) {
        System.out.println("save inventory");
        return new ResponseUtil("200", "Successfully Saved!", inventoryService.checkSupplier(inventoryDTO));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveInventory(@RequestBody InventoryDTO inventoryDTO) {
        inventoryService.saveInventory(inventoryDTO);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{id}")
    public ResponseEntity<InventoryDTO> getInventoryById(@PathVariable("id") String id) {
        Optional<InventoryDTO> optionalImageEntity = Optional.ofNullable(inventoryService.getInventory(id));

        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getItems() {
        return new ResponseUtil("200", "Successfully Fetched Employees", inventoryService.getAllInventory());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PatchMapping
    public ResponseUtil updateItem(@RequestBody InventoryDTO inventoryDTO) {
        inventoryService.updateInventory(inventoryDTO);
        return new ResponseUtil("200", "Successfully Updated!", null);
    }
}

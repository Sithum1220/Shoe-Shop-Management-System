package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.service.InventoryService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    public ResponseUtil saveSupplier(@RequestBody InventoryDTO inventoryDTO) {
        inventoryService.saveInventory(inventoryDTO);
        return new ResponseUtil("200", "Successfully Saved!", null);
    }

}

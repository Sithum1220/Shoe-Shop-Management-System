package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.service.CustomerService;
import lk.ijse.spring.shoeshop.service.InventoryService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/orders")
@CrossOrigin
public class PurchaseOrderController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private InventoryService inventoryService;

    @PostMapping( "/customer")
    public ResponseUtil getCustomerDetails(@RequestBody CustomerDTO customerDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",customerService.getCustomerDetailsForOrder(customerDTO));
    }
    @PostMapping( "/item")
    public ResponseUtil getItemDetails(@RequestBody InventoryDTO inventoryDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",inventoryService.getItemDetailsForOrder(inventoryDTO));
    }
}

package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SaleDTO;
import lk.ijse.spring.shoeshop.service.CustomerService;
import lk.ijse.spring.shoeshop.service.InventoryService;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/orders")
@CrossOrigin
public class PurchaseOrderController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    @PostMapping( "/customer")
    public ResponseUtil getCustomerDetails(@RequestBody CustomerDTO customerDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",customerService.getCustomerDetailsForOrder(customerDTO));
    }
    @PostMapping( "/item")
    public ResponseUtil getItemDetails(@RequestBody InventoryDTO inventoryDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",inventoryService.getItemDetailsForOrder(inventoryDTO));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id", GenerateNewId.nextId(purchaseOrderService.lastId(), "OR00"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil purchaseOrder(@RequestBody SaleDTO saleDTO){
        purchaseOrderService.purchaseOrder(saleDTO);
        return new ResponseUtil("200","Successfully Purchased",null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping
    public ResponseUtil getAllOrders(){
        return new ResponseUtil("200","Successfully Purchased",purchaseOrderService.getAllOrders());
    }

}

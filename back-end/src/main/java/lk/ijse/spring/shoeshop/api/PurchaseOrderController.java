package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SaleDTO;
import lk.ijse.spring.shoeshop.dto.SaleDetailsDTO;
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
        return new ResponseUtil("200","Successfully Fetch Customers",
                customerService.getCustomerDetailsForOrder(customerDTO));
    }
    @PostMapping( "/item")
    public ResponseUtil getItemDetails(@RequestBody InventoryDTO inventoryDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",
                inventoryService.getItemDetailsForOrder(inventoryDTO));
    }
    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id",
                GenerateNewId.nextId(purchaseOrderService.lastId(), "OR00"));
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
        return new ResponseUtil("200","Successfully Fetch Order",
                purchaseOrderService.getAllOrders());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/orderDetails")
    public ResponseUtil getAllOrderDetails(@RequestBody SaleDTO saleDTO){
        return new ResponseUtil("200","Successfully Fetch Order Details",
                purchaseOrderService.getAllOrderDetails(saleDTO));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{orderId}")
    public ResponseUtil orderCanBeReturned(@PathVariable("orderId") String orderId){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                purchaseOrderService.canBeReturned(orderId));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{returnOrderId}")
    public ResponseUtil returnFullOrder(@PathVariable("returnOrderId") String orderId){
        System.out.println(orderId);
        purchaseOrderService.returnFullOrder(orderId);
        return new ResponseUtil("200","Successfully Return Full Order",null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/oneItem")
    public ResponseUtil returnOneItemOrder(@RequestBody SaleDetailsDTO saleDetailsDTO){
        purchaseOrderService.returnOneItem(saleDetailsDTO);
        return new ResponseUtil("200","Successfully Return One Item Order",null);
    }

}

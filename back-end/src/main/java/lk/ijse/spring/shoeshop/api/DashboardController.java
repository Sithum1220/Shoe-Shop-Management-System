package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.entity.Sales;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import lk.ijse.spring.shoeshop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/v1/dashboard")
@CrossOrigin
public class DashboardController {
    @Autowired
    private PurchaseOrderService purchaseOrderService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/totalSale/{date}")
    public ResponseUtil totalSales(@PathVariable("date") LocalDate date) {
        return new ResponseUtil("200", "Successfully Saved!", purchaseOrderService.totalSalesOfASelectedDate(date));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/totalProfit/{profitDate}")
    public ResponseUtil totalProfit(@PathVariable("profitDate") LocalDate date) {
        return new ResponseUtil("200", "Successfully Saved!", purchaseOrderService.totalProfitOfASelectedDate(date));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/mostSaleItem/{mostSaleDate}")
    public ResponseUtil mostSaleItem(@PathVariable("mostSaleDate") LocalDate date) {
        return new ResponseUtil("200", "Successfully Saved!", purchaseOrderService.mostSoldItemAndColor(date));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/recent")
    public ResponseUtil getLastThreeOrders() {
        return new ResponseUtil("200", "Successfully Saved!", purchaseOrderService.getLastThreeOrders());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/totalItemsSold/{itemSoldDate}")
    public ResponseUtil totalItemsSold(@PathVariable("itemSoldDate") LocalDate date) {
        return new ResponseUtil("200", "Successfully Retrieved!", purchaseOrderService.totalItemsSoldOnDate(date));
    }
}

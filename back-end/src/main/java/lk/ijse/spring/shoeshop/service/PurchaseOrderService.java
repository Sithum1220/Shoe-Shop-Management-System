package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.SaleDTO;
import lk.ijse.spring.shoeshop.dto.SaleDetailsDTO;
import lk.ijse.spring.shoeshop.entity.Sales;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface PurchaseOrderService {

     String lastId();

     void purchaseOrder(SaleDTO saleDTO);

     List<SaleDTO> getAllOrders();
     List<SaleDetailsDTO> getAllOrderDetails(SaleDTO saleDTO);

     boolean canBeReturned(String orderNo);

     void returnFullOrder(String orderNo);

     void returnOneItem(SaleDetailsDTO saleDetailsDTO);

     int totalSalesOfASelectedDate(LocalDate date);

     double totalProfitOfASelectedDate(LocalDate localDate);

     Map<String, Object> mostSoldItemAndColor(LocalDate date);

      List<Sales> getLastThreeOrders();

     int totalItemsSoldOnDate(LocalDate date);
}

package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.SaleDTO;
import lk.ijse.spring.shoeshop.dto.SaleDetailsDTO;

import java.util.List;

public interface PurchaseOrderService {

     String lastId();

     void purchaseOrder(SaleDTO saleDTO);

     List<SaleDTO> getAllOrders();
     List<SaleDetailsDTO> getAllOrderDetails(SaleDTO saleDTO);
}

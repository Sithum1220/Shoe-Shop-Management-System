package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.SaleDTO;

import java.util.List;

public interface PurchaseOrderService {

     String lastId();

     void purchaseOrder(SaleDTO saleDTO);

     List<SaleDTO> getAllOrders();
}

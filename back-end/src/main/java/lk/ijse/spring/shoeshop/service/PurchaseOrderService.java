package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.SalesCustomDTO;

import java.util.List;

public interface PurchaseOrderService {

     String lastId();

     void purchaseOrder(List<SalesCustomDTO> salesCustomDTOList);
}

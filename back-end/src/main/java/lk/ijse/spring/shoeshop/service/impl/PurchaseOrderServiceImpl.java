package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.SalesCustomDTO;
import lk.ijse.spring.shoeshop.entity.SaleDetails;
import lk.ijse.spring.shoeshop.entity.Sales;
import lk.ijse.spring.shoeshop.repository.InventoryRepository;
import lk.ijse.spring.shoeshop.repository.PurchaseOrderDetailsRepository;
import lk.ijse.spring.shoeshop.repository.PurchaseOrderRepository;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    PurchaseOrderRepository purchaseOrderRepository;
    PurchaseOrderDetailsRepository purchaseOrderDetailsRepository;

    public PurchaseOrderServiceImpl(PurchaseOrderRepository repository, PurchaseOrderDetailsRepository purchaseOrderDetailsRepository, InventoryRepository inventoryRepository) {
        this.purchaseOrderRepository = repository;
        this.purchaseOrderDetailsRepository = purchaseOrderDetailsRepository;

    }

    @Override
    public String lastId() {
        return purchaseOrderRepository.getLastIndex();
    }

    @Override
    public void purchaseOrder(List<SalesCustomDTO> salesCustomDTOList) {


        // sale table
        Sales sales = new Sales();

        sales.setOrderNo(salesCustomDTOList.get(0).getOrderNo());
        sales.setPurchaseDate(LocalDate.now());

        double totalPrice = 0;
        for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
            totalPrice += salesCustomDTO.getItmQTY() * salesCustomDTO.getUnitPrice();
        }
        sales.setTotal(totalPrice);
        sales.setPaymentMethod(salesCustomDTOList.get(0).getPaymentMethod());

        if (totalPrice >= 800){
            sales.setTotalPoints(1);
        }

        sales.setCashier("Sithum");

        sales.setCustomerId(salesCustomDTOList.get(0).getCustomerId());

        System.out.println(sales);

        //saleDetails table
        List<SaleDetails> saleDetailsList = new ArrayList<>();
        SaleDetails saleDetail = new SaleDetails();
        for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
            saleDetail.setItmQTY(salesCustomDTO.getItmQTY());
            saleDetail.setOrderNo(sales);
            saleDetail.setInventory(salesCustomDTO.getInventory());
            saleDetail.setItmTotal(salesCustomDTO.getItmQTY() * salesCustomDTO.getUnitPrice());
            saleDetailsList.add(saleDetail);
        }

        for (SaleDetails saleDetails : saleDetailsList) {
            System.out.println(saleDetails);
        }

        // item Update


    }
}

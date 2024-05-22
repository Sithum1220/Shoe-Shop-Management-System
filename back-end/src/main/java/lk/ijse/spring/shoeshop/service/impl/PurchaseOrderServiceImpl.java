package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.SalesCustomDTO;
import lk.ijse.spring.shoeshop.embedded.LoyaltyLevel;
import lk.ijse.spring.shoeshop.embedded.SaleDetailPK;
import lk.ijse.spring.shoeshop.entity.*;
import lk.ijse.spring.shoeshop.repository.*;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final ModelMapper modelMapper;
    PurchaseOrderRepository purchaseOrderRepository;
    PurchaseOrderDetailsRepository purchaseOrderDetailsRepository;
    InventoryRepository inventoryRepository;
    SizeRepository sizeRepository;
    CustomerRepository customerRepository;

    public PurchaseOrderServiceImpl(PurchaseOrderRepository repository, PurchaseOrderDetailsRepository
            purchaseOrderDetailsRepository, InventoryRepository inventoryRepository, SizeRepository
                                            sizeRepository, ModelMapper modelMapper, CustomerRepository customerRepository) {
        this.purchaseOrderRepository = repository;
        this.purchaseOrderDetailsRepository = purchaseOrderDetailsRepository;
        this.inventoryRepository = inventoryRepository;
        this.sizeRepository = sizeRepository;
        this.modelMapper = modelMapper;
        this.customerRepository = customerRepository;
    }

    @Override
    public String lastId() {
        return purchaseOrderRepository.getLastIndex();
    }

    @Override
    public void purchaseOrder(List<SalesCustomDTO> salesCustomDTOList) {

        System.out.println("customer id: " + salesCustomDTOList.get(0).getCustomerId().getCustomerId());
        // sale table
        Sales sales = new Sales();

        sales.setOrderNo(salesCustomDTOList.get(0).getSaleDetailPK().getOrderNo());
        sales.setPurchaseDate(LocalDate.now());

        double totalPrice = 0;
        for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
            totalPrice += salesCustomDTO.getItmQTY() * salesCustomDTO.getUnitPrice();
        }
        sales.setTotal(totalPrice);
        sales.setPaymentMethod(salesCustomDTOList.get(0).getPaymentMethod());

        Customer byCustomerId = customerRepository.findByCustomerId(salesCustomDTOList.get(0).getCustomerId().getCustomerId());
        if (totalPrice >= 800) {
            sales.setTotalPoints(200);
            int totalPoint = byCustomerId.getTotalPoints() + sales.getTotalPoints();
            byCustomerId.setTotalPoints(totalPoint);
        }

        byCustomerId.setRecentPurchase(LocalDate.now());

        if (byCustomerId.getTotalPoints() >= 200){
            byCustomerId.setLevel(LoyaltyLevel.GOLD);
        } else if (byCustomerId.getTotalPoints() >= 100) {
            byCustomerId.setLevel(LoyaltyLevel.SILVER);
        } else if (byCustomerId.getTotalPoints() >= 50) {
            byCustomerId.setLevel(LoyaltyLevel.BRONZE);
        } else {
            byCustomerId.setLevel(LoyaltyLevel.NEW);
        }

        sales.setCashier("Sithum");

        sales.setCustomerId(modelMapper.map(salesCustomDTOList.get(0).getCustomerId(), Customer.class));

        System.out.println(sales);

        purchaseOrderRepository.save(sales);

        //saleDetails table
        System.out.println("saleDetails table");

        List<SaleDetails> saleDetailsList = new ArrayList<>();
        SaleDetails saleDetail = new SaleDetails();
        Inventory inventory = new Inventory();

        for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
            saleDetail.setOrderDetailPK(modelMapper.map(salesCustomDTO.getSaleDetailPK(), SaleDetailPK.class));
            saleDetail.setItmQTY(salesCustomDTO.getItmQTY());
            System.out.println("Sale: " + sales.getOrderNo());
            saleDetail.setOrderNo(sales);
            inventory.setItemCode(salesCustomDTO.getSaleDetailPK().getItemCode());
            System.out.println("inventory item code: " + inventory.getItemCode());
            saleDetail.setInventory(inventory);
            saleDetail.setItmTotal(salesCustomDTO.getItmQTY() * salesCustomDTO.getUnitPrice());
            saleDetailsList.add(saleDetail);
        }

        for (SaleDetails saleDetails : saleDetailsList) {
            System.out.println(saleDetails);
        }


        purchaseOrderDetailsRepository.saveAll(saleDetailsList);
        // item Update
        System.out.println("item Update");

        for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
            Inventory inventoryData = inventoryRepository.findByItemCode(salesCustomDTO.getSaleDetailPK().getItemCode());
            System.out.println("SizeId: " + salesCustomDTO.getSizeDTO());
            Size bySizeId = sizeRepository.findBySizeId(salesCustomDTO.getSizeDTO().getId());
            bySizeId.setQty(bySizeId.getQty() - salesCustomDTO.getItmQTY());
            System.out.println(bySizeId.getQty());
            inventoryData.setQty(inventoryData.getQty() - salesCustomDTO.getItmQTY());

            double percentage = ((double) inventoryData.getQty() / inventoryData.getOriginalQty() ) *100;
            if (percentage > 50){
                inventoryData.setStatus("Available");
            } else if (percentage <= 50 && percentage > 0) {
                inventoryData.setStatus("Low");
            } else if (inventoryData.getQty() == 0) {
                inventoryData.setStatus("Not Available");
            }
        }

    }
}

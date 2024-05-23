package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.*;
import lk.ijse.spring.shoeshop.embedded.LoyaltyLevel;
import lk.ijse.spring.shoeshop.entity.*;
import lk.ijse.spring.shoeshop.repository.*;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final ModelMapper modelMapper;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final PurchaseOrderDetailsRepository purchaseOrderDetailsRepository;
    private final InventoryRepository inventoryRepository;
    private final SizeRepository sizeRepository;
    private final CustomerRepository customerRepository;

    public PurchaseOrderServiceImpl(
            PurchaseOrderRepository purchaseOrderRepository,
            PurchaseOrderDetailsRepository purchaseOrderDetailsRepository,
            InventoryRepository inventoryRepository,
            SizeRepository sizeRepository,
            ModelMapper modelMapper,
            CustomerRepository customerRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
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
    public void purchaseOrder(SaleDTO saleDTO) {
        saleDTO.setPurchaseDate(LocalDate.now());

        System.out.println(saleDTO.getCustomerId().getCustomerId());

        if (saleDTO.getCustomerId().getCustomerId() != null) {
            Customer customer = customerRepository.findByCustomerId(saleDTO.getCustomerId().getCustomerId());
            // Update customer loyalty points and level
            if (saleDTO.getTotal() >= 800) {
                saleDTO.setTotalPoints(1);
                customer.setTotalPoints(customer.getTotalPoints() + saleDTO.getTotalPoints());
            }
            customer.setRecentPurchase(LocalDate.now());
            updateCustomerLoyaltyLevel(customer);
        } else {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO.setCustomerId("Nan");
            saleDTO.setCustomerId(customerDTO);
        }


        // Save the sale order
        System.out.println("Save the sale order");
        System.out.println("Sales DTO: " + saleDTO);

        List<SaleDetailsDTO> saleDetailsDTOS = saleDTO.getSaleDetails();
        saleDTO.setSaleDetails(null);
        Sales salesEntity = modelMapper.map(saleDTO, Sales.class);
        System.out.println("Sales Entity: " + salesEntity);
        purchaseOrderRepository.save(salesEntity);

        // Process sale details
        for (SaleDetailsDTO saleDetailsDTO : saleDetailsDTOS) {
            SaleDetails saleDetails = new SaleDetails(
                    modelMapper.map(saleDetailsDTO.getSizeDTO(), Size.class),
                    saleDetailsDTO.getSize(),
                    saleDetailsDTO.getColor(),
                    saleDetailsDTO.getItmTotal(),
                    modelMapper.map(saleDetailsDTO.getInventoryDTO(), Inventory.class),
                    salesEntity, // Associate the sale details with the saved sales entity
                    saleDetailsDTO.getItmQTY()
            );

            System.out.println("Fuck");
            // Save the sale details
            purchaseOrderDetailsRepository.save(saleDetails);

            // Update inventory and size quantities
            updateInventoryAndSizeQuantities(saleDetailsDTO);
        }
    }

    @Override
    public List<SaleDTO> getAllOrders() {
        return modelMapper.map(purchaseOrderRepository.findAll(), new TypeToken<List<SaleDTO>>() {}.getType());
    }


    private void updateCustomerLoyaltyLevel(Customer customer) {
        if (customer.getTotalPoints() >= 200) {
            customer.setLevel(LoyaltyLevel.GOLD);
        } else if (customer.getTotalPoints() >= 100) {
            customer.setLevel(LoyaltyLevel.SILVER);
        } else if (customer.getTotalPoints() >= 50) {
            customer.setLevel(LoyaltyLevel.BRONZE);
        } else {
            customer.setLevel(LoyaltyLevel.NEW);
        }
    }

    private void updateInventoryAndSizeQuantities(SaleDetailsDTO saleDetailsDTO) {
        Inventory inventory = inventoryRepository.findByItemCode(saleDetailsDTO.getInventoryDTO().getItemCode());
        Size size = sizeRepository.findBySizeId(saleDetailsDTO.getSizeDTO().getId());

        int newInventoryQty = inventory.getQty() - saleDetailsDTO.getItmQTY();
        inventory.setQty(newInventoryQty);

        double percentage = ((double) newInventoryQty / inventory.getOriginalQty()) * 100;
        if (percentage > 50) {
            inventory.setStatus("Available");
        } else if (percentage <= 50 && percentage > 0) {
            inventory.setStatus("Low");
        } else if (newInventoryQty == 0) {
            inventory.setStatus("Not Available");
        }

        size.setQty(size.getQty() - saleDetailsDTO.getItmQTY());
    }
}


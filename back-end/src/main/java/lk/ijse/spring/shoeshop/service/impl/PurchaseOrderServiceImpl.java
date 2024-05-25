package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.*;
import lk.ijse.spring.shoeshop.enumeration.LoyaltyLevel;
import lk.ijse.spring.shoeshop.entity.*;
import lk.ijse.spring.shoeshop.enumeration.Order_Status;
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
                    modelMapper.map(saleDetailsDTO.getInventory(), Inventory.class),
                    salesEntity, // Associate the sale details with the saved sales entity
                    saleDetailsDTO.getItmQTY(),
                    saleDetailsDTO.getStatus()
            );

            // Save the sale details
            purchaseOrderDetailsRepository.save(saleDetails);

            // Update inventory and size quantities
            updateInventoryAndSizeQuantities(saleDetailsDTO);
        }
    }

    @Override
    public List<SaleDTO> getAllOrders() {
        return modelMapper.map(purchaseOrderRepository.findAll(), new TypeToken<List<SaleDTO>>() {
        }.getType());
    }

    @Override
    public List<SaleDetailsDTO> getAllOrderDetails(SaleDTO saleDTO) {
        System.out.println("Sales DTO: " + saleDTO);
        return modelMapper.map(purchaseOrderDetailsRepository.findAllByOrderNo(modelMapper.map(saleDTO, Sales.class)),
                new TypeToken<List<SaleDetailsDTO>>() {
                }.getType());
    }

    @Override
    public boolean canBeReturned(String orderNo) {
        Sales sales = purchaseOrderRepository.findById(orderNo).orElse(null);
        if (sales == null) {
            // Handle case where order with given orderNo does not exist
            return false;
        }

        LocalDate purchaseDate = sales.getPurchaseDate();

        // Calculate the date three days from the purchase date
        LocalDate threeDaysFromPurchase = purchaseDate.plusDays(3);

        // Get the current date
        LocalDate currentDate = LocalDate.now();

        // Check if the current date is within three days from the purchase date
        return !currentDate.isAfter(threeDaysFromPurchase);
    }

    @Override
    public void returnFullOrder(String orderNo) {
        Sales sales = new Sales();
        sales.setOrderNo(orderNo);
        System.out.println(orderNo);
        Sales byOrderNo = purchaseOrderRepository.findByOrderNo(orderNo);
        if (byOrderNo.getStatus() != Order_Status.RETURNED) {
            if (byOrderNo.getStatus() != Order_Status.CONFIRMED) {
                System.out.println(byOrderNo);
                byOrderNo.setStatus(Order_Status.RETURNED);
                purchaseOrderRepository.save(byOrderNo);

                List<SaleDetails> allByOrderNo = purchaseOrderDetailsRepository.findAllByOrderNo(sales);

                for (SaleDetails saleDetails : allByOrderNo) {
                    int qty = saleDetails.getItmQTY();
                    Size bySizeId = sizeRepository.findBySizeId(saleDetails.getSize().getSizeId());
                    bySizeId.setQty(bySizeId.getQty() + qty);
                    Inventory byItemCode = inventoryRepository.findByItemCode(saleDetails.getInventory().getItemCode());
                    byItemCode.setQty(byItemCode.getQty() + qty);
                    saleDetails.setStatus(Order_Status.RETURNED);
                    purchaseOrderDetailsRepository.save(saleDetails);
                }
            } else {
                throw new EntityExistsException("Sorry! This order Cannot be returned");
            }
        } else {
            throw new EntityExistsException("Sorry! This order has already been returned");
        }

    }

    @Override
    public void returnOneItem(SaleDetailsDTO saleDetailsDTO) {
        if (purchaseOrderDetailsRepository.existsByOrderNoAndColorAndSizesAndInventory(modelMapper.map(saleDetailsDTO.
                getOrderNo(), Sales.class), saleDetailsDTO.getColor(), saleDetailsDTO.getSize(), modelMapper.
                map(saleDetailsDTO.getInventory(), Inventory.class))) {

            SaleDetails details = purchaseOrderDetailsRepository.findByOrderNoAndColorAndSizesAndInventory(modelMapper.map(saleDetailsDTO.
                    getOrderNo(), Sales.class), saleDetailsDTO.getColor(), saleDetailsDTO.getSize(), modelMapper.
                    map(saleDetailsDTO.getInventory(), Inventory.class));

            if (details.getStatus() != Order_Status.RETURNED) {
                if (details.getStatus() != Order_Status.CONFIRMED) {

                    details.setItmQTY(details.getItmQTY() - saleDetailsDTO.getItmQTY());

                    Size bySizeId = sizeRepository.findBySizeId(details.getSize().getSizeId());
                    bySizeId.setQty(bySizeId.getQty() + saleDetailsDTO.getItmQTY());

                    Inventory byItemCode = inventoryRepository.findByItemCode(details.getInventory().getItemCode());
                    byItemCode.setQty(byItemCode.getQty() + saleDetailsDTO.getItmQTY());
                    details.setStatus(Order_Status.RETURNED);

                    List<SaleDetails> allByOrderNo = purchaseOrderDetailsRepository.findAllByOrderNo(modelMapper.map(saleDetailsDTO.getOrderNo(), Sales.class));

                    int count = 0;
                    for (SaleDetails saleDetails : allByOrderNo) {
                        if (saleDetails.getStatus() == Order_Status.RETURNED) {
                            count++;
                        }
                    }
                    if(count == allByOrderNo.size()){
                        Sales byOrderNo = purchaseOrderRepository.findByOrderNo(saleDetailsDTO.getOrderNo().getOrderNo());
                        byOrderNo.setStatus(Order_Status.RETURNED);
                    }

                } else {
                    throw new EntityExistsException("Sorry! This order Cannot be returned");
                }
            } else {
                throw new EntityExistsException("Sorry! This order has already been returned");
            }
        } else {
            throw new EntityExistsException("Sorry! No such order found");
        }
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
        Inventory inventory = inventoryRepository.findByItemCode(saleDetailsDTO.getInventory().getItemCode());
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


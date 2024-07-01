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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        saleDTO.setStatus(Order_Status.ACTIVE);
        System.out.println(saleDTO.getCustomerId().getCustomerId());

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
                    Order_Status.ACTIVE
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
            return false;
        }

        LocalDate purchaseDate = sales.getPurchaseDate();

        LocalDate threeDaysFromPurchase = purchaseDate.plusDays(3);

        LocalDate currentDate = LocalDate.now();

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
                    saleDetails.setReturnedQty(saleDetails.getItmQTY());
                    saleDetails.setItmQTY(0);
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
                    if (details.getItmQTY() >= saleDetailsDTO.getItmQTY()) {

                        int qty = details.getItmQTY();

                        details.setItmQTY(details.getItmQTY() - saleDetailsDTO.getItmQTY());
                        details.setReturnedQty(details.getReturnedQty() + saleDetailsDTO.getItmQTY());

                        Size bySizeId = sizeRepository.findBySizeId(details.getSize().getSizeId());
                        bySizeId.setQty(bySizeId.getQty() + saleDetailsDTO.getItmQTY());

                        Inventory byItemCode = inventoryRepository.findByItemCode(details.getInventory().getItemCode());
                        byItemCode.setQty(byItemCode.getQty() + saleDetailsDTO.getItmQTY());

                        List<SaleDetails> allByOrderNo = purchaseOrderDetailsRepository.findAllByOrderNo(modelMapper.map(saleDetailsDTO.getOrderNo(), Sales.class));
                        if (qty == saleDetailsDTO.getItmQTY()) {
                            details.setStatus(Order_Status.RETURNED);
                            int count = 0;
                            for (SaleDetails saleDetails : allByOrderNo) {
                                if (saleDetails.getStatus() == Order_Status.RETURNED) {
                                    count++;
                                }
                            }
                            if (count == allByOrderNo.size()) {
                                Sales byOrderNo = purchaseOrderRepository.findByOrderNo(saleDetailsDTO.getOrderNo().getOrderNo());
                                byOrderNo.setStatus(Order_Status.RETURNED);
                            }
                        }
                    }else {
                        throw new EntityExistsException("Sorry! The Qty you entered is too high. Please try again.");
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

    @Override
    public int totalSalesOfASelectedDate(LocalDate date) {
        return purchaseOrderRepository.countByPurchaseDate(date);
    }

    @Override
    public double totalProfitOfASelectedDate(LocalDate date) {
        List<Sales> allByPurchaseDate = purchaseOrderRepository.findAllByPurchaseDate(date);
        double totalProfit = 0;
        for (Sales sale : allByPurchaseDate) {
            List<SaleDetails> allByOrderNo = purchaseOrderDetailsRepository.findAllByOrderNo(sale);
                for (SaleDetails saleDetails : allByOrderNo) {
                    Inventory byItemCode = inventoryRepository.findByItemCode(saleDetails.getInventory().getItemCode());
                    double byPrice = byItemCode.getBuyPrice();
                    double sellPrice = byItemCode.getSalePrice();

                    double cost = saleDetails.getItmQTY() * byPrice;
                    double totalSellPrice = saleDetails.getItmQTY() * sellPrice;
                    totalProfit += totalSellPrice - cost;
                }
        }
        return totalProfit;
    }

    @Override
    public Map<String, Object> mostSoldItemAndColor(LocalDate date) {
        List<Sales> salesList = purchaseOrderRepository.findAllByPurchaseDate(date);
        Map<String, Integer> itemSalesCount = new HashMap<>();

        for (Sales sale : salesList) {
            List<SaleDetails> saleDetailsList = purchaseOrderDetailsRepository.findAllByOrderNo(sale);
            for (SaleDetails saleDetails : saleDetailsList) {
                String itemCode = saleDetails.getInventory().getItemCode();
                int currentCount = itemSalesCount.getOrDefault(itemCode, 0);
                itemSalesCount.put(itemCode, currentCount + saleDetails.getItmQTY());
            }
        }

        // Find the item with the highest sales count
        String mostSoldItem = null;
        int highestSalesCount = 0;

        for (Map.Entry<String, Integer> entry : itemSalesCount.entrySet()) {
            if (entry.getValue() > highestSalesCount) {
                mostSoldItem = entry.getKey();
                highestSalesCount = entry.getValue();
            }
        }

        Map<String, Object> result = new HashMap<>();
        if (mostSoldItem != null) {
            result.put("itemCode", mostSoldItem);
            result.put("salesCount", highestSalesCount);
        }

        return result;
    }

    @Override
    public List<Sales> getLastThreeOrders() {
        Pageable pageable = PageRequest.of(0, 3);
        return purchaseOrderRepository.findLastThreeOrders(pageable);
    }

    @Override
    public int totalItemsSoldOnDate(LocalDate date) {
        List<Sales> salesList = purchaseOrderRepository.findAllByPurchaseDate(date);
        int totalItemsSold = 0;
        for (Sales sale : salesList) {
            List<SaleDetails> saleDetailsList = purchaseOrderDetailsRepository.findAllByOrderNo(sale);
            for (SaleDetails saleDetails : saleDetailsList) {
                totalItemsSold += saleDetails.getItmQTY();
            }
        }
        return totalItemsSold;
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


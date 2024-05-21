package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SizeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Inventory;
import lk.ijse.spring.shoeshop.entity.Size;
import lk.ijse.spring.shoeshop.entity.Supplier;
import lk.ijse.spring.shoeshop.repository.InventoryRepository;
import lk.ijse.spring.shoeshop.repository.SizeRepository;
import lk.ijse.spring.shoeshop.repository.SupplierRepository;
import lk.ijse.spring.shoeshop.service.InventoryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    SupplierRepository supplierRepository;
    InventoryRepository inventoryRepository;
    SizeRepository sizeRepository;
    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, ModelMapper modelMapper,
                                SupplierRepository supplierRepository, SizeRepository sizeRepository) {
        this.inventoryRepository = inventoryRepository;
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;
        this.sizeRepository = sizeRepository;
    }

    @Override
    public void saveInventory(InventoryDTO inventoryDTO) {
        System.out.println("Inside saveInventory");
        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {

            int totalQty = 0;
            InventoryDTO inventoryDTO1 = new InventoryDTO();
            inventoryDTO1.setItemCode(inventoryDTO.getItemCode());


            if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {
                for (int i = 0; i < inventoryDTO.getSizeList().size(); i++) {
                    System.out.println(inventoryDTO.getSizeList().get(i).getId());
                    if (inventoryDTO.getSizeList().get(i).getId() != 0) {
                        Size bySizeId = sizeRepository.findBySizeId(inventoryDTO.getSizeList().get(i).getId());
                        int qty = inventoryDTO.getSizeList().get(i).getQty() + bySizeId.getQty();
                        inventoryDTO.getSizeList().get(i).setQty(qty);
                    }
                }
            }

            for (int i = 0; i < inventoryDTO.getSizeList().size(); i++) {
                totalQty += inventoryDTO.getSizeList().get(i).getQty();
            }
                inventoryDTO.setOriginalQty(totalQty);
                inventoryDTO.setQty(totalQty);

            inventoryDTO.setStatus("Available");

            if (inventoryDTO.getSalePrice() > inventoryDTO.getBuyPrice()) {

                double profit = inventoryDTO.getSalePrice() - inventoryDTO.getBuyPrice();

                double profitPercentage = (profit / inventoryDTO.getSalePrice()) * 100;
                inventoryDTO.setExpectedProfit(profit);
                inventoryDTO.setProfitMargin(profitPercentage);

            } else {
                throw new EntityExistsException("please Check Prices!");
            }


            Inventory map = modelMapper.map(inventoryDTO, Inventory.class);
            for (int i = 0; i < inventoryDTO.getSizeList().size(); i++) {
                map.getSizeList().get(i).setInventory(modelMapper.map(inventoryDTO1, Inventory.class));
            }
            System.out.println("map = " + map.toString());
            inventoryRepository.save(map);

        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public InventoryDTO checkStatus(InventoryDTO inventoryDTO) {
        try {
            if (inventoryDTO == null || inventoryDTO.getItemCode() == null) {
                throw new IllegalArgumentException("InventoryDTO or ItemCode cannot be null.");
            }

            if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {
                Inventory byItemCode = inventoryRepository.findByItemCode(inventoryDTO.getItemCode());
                return modelMapper.map(byItemCode, InventoryDTO.class);
            } else {
                inventoryDTO.setStatus("No Item Found");
                return inventoryDTO;
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while checking inventory status.");
        }
    }

    @Override
    public String checkSupplier(InventoryDTO inventoryDTO) {
        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {
            return supplierRepository.findNameById(inventoryDTO.getSupplier().getSupplierCode());
        } else {
            return "Supplier Not Found";
        }
    }

    @Override
    public void updateInventory(InventoryDTO inventoryDTO) {
        if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {

            int totalQty = 0;
            InventoryDTO inventoryDTO1 = new InventoryDTO();
            inventoryDTO1.setItemCode(inventoryDTO.getItemCode());


            for (int i = 0; i < inventoryDTO.getSizeList().size(); i++) {
                totalQty += inventoryDTO.getSizeList().get(i).getQty();
            }

            if (totalQty != Integer.parseInt(inventoryRepository.findQtyById(inventoryDTO.getItemCode()))){
                inventoryDTO.setOriginalQty(totalQty);
                inventoryDTO.setQty(totalQty);
            }else {
                inventoryDTO.setQty(Integer.parseInt(inventoryRepository.findQtyById(inventoryDTO.getItemCode())));
                inventoryDTO.setOriginalQty(Integer.parseInt(inventoryRepository.findOriginalQtyById(inventoryDTO.getItemCode())));
            }

            inventoryDTO.setStatus("Available");

            if (inventoryDTO.getSalePrice() > inventoryDTO.getBuyPrice()) {

                double profit = inventoryDTO.getSalePrice() - inventoryDTO.getBuyPrice();
                double profitPercentage = (profit / inventoryDTO.getSalePrice()) * 100;
                inventoryDTO.setExpectedProfit(profit);
                inventoryDTO.setProfitMargin(profitPercentage);

            } else {
                throw new EntityExistsException("please Check Prices!");
            }


            Inventory map = modelMapper.map(inventoryDTO, Inventory.class);
            for (int i = 0; i < inventoryDTO.getSizeList().size(); i++) {
                map.getSizeList().get(i).setInventory(modelMapper.map(inventoryDTO1, Inventory.class));
            }
            System.out.println("map = " + map.toString());
            inventoryRepository.save(map);



        } else {
            throw new EntityExistsException("Item Not Found!");
        }
    }

    @Override
    public void deleteInventory(String id) {

    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return modelMapper.map(inventoryRepository.findAll(), new TypeToken<List<InventoryDTO>>() {
        }.getType());
    }

    @Override
    public InventoryDTO getInventory(String id) {
        return modelMapper.map(inventoryRepository.findById(id), InventoryDTO.class);
    }

    @Override
    public Object getItemDetailsForOrder(InventoryDTO inventoryDTO) {
        if (inventoryRepository.existsById(inventoryDTO.getItemCode())){
            return modelMapper.map(inventoryRepository.findById(inventoryDTO.getItemCode()), Inventory.class);
        }else {
            return "Item Not Found!";
        }
    }

}

package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Inventory;
import lk.ijse.spring.shoeshop.repository.InventoryRepository;
import lk.ijse.spring.shoeshop.repository.SupplierRepository;
import lk.ijse.spring.shoeshop.service.InventoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    SupplierRepository supplierRepository;
    InventoryRepository inventoryRepository;
    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, ModelMapper modelMapper,
                                SupplierRepository supplierRepository) {
        this.inventoryRepository = inventoryRepository;
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;
    }

    @Override
    public void saveInventory(InventoryDTO inventoryDTO) {

        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {

            String qtyById = inventoryRepository.findQtyById(inventoryDTO.getItemCode());
            System.out.println(qtyById);
            if (qtyById == null) {
                qtyById = "0";
            }
            int i = Integer.parseInt(qtyById) + inventoryDTO.getQty();
            System.out.println(i);
            inventoryDTO.setOriginalQty(i);
            inventoryDTO.setQty(i);
            inventoryDTO.setStatus("Available");
            inventoryRepository.save(modelMapper.map(inventoryDTO, Inventory.class));
        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public String checkStatus(InventoryDTO inventoryDTO) {
        if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {
            String status = inventoryRepository.findStatusById(inventoryDTO.getItemCode());
            System.out.println(status);
            return status;
        } else {
            return "No Item Found";
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

    }

    @Override
    public void deleteInventory(String id) {

    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return List.of();
    }

    @Override
    public InventoryDTO getInventory(String id) {
        return null;
    }
}

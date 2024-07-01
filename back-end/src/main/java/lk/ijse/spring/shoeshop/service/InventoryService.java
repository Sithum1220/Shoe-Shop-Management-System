package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface InventoryService {

    void saveInventory(InventoryDTO inventoryDTO);

    InventoryDTO checkStatus(InventoryDTO inventoryDTO);

    String checkSupplier(InventoryDTO inventoryDTO);

    void updateInventory(InventoryDTO inventoryDTO);

    void deleteInventory(String id);

    List<InventoryDTO> getAllInventory();

    InventoryDTO getInventory(String id);

    Object getItemDetailsForOrder(InventoryDTO inventoryDTO);
}

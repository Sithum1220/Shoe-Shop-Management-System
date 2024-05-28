package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.dto.InventoryDTO;
import lk.ijse.spring.shoeshop.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface InventoryRepository extends JpaRepository<Inventory, String> {
    Inventory findByItemCode(String itemCode);

    @Query("SELECT i.status FROM Inventory i WHERE i.itemCode = :id")
    String findStatusById(String id);

    @Query("SELECT i.qty FROM Inventory i WHERE i.itemCode = :id")
    String findQtyById(String id);

    @Query("SELECT i.originalQty FROM Inventory i WHERE i.itemCode = :id")
    String findOriginalQtyById(String id);

    @Query("SELECT i.itemPicture FROM Inventory i WHERE i.itemCode = :id")
    String findPictureById(String id);
}

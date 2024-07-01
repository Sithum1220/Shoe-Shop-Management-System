package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Inventory;
import lk.ijse.spring.shoeshop.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Integer> {

    List<Size> findAllByInventory(Inventory inventory);
    Size findBySizeId(int id);
    @Query("SELECT SUM(s.qty) FROM Size s WHERE s.inventory = ?1")
    int getTotalQtyByItemCode(Inventory inventory);
}

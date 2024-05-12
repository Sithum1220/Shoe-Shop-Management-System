package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Inventory;
import lk.ijse.spring.shoeshop.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Integer> {

    List<Size> findAllByInventory(Inventory inventory);
}

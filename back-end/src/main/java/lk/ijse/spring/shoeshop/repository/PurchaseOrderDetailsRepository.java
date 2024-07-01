package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Inventory;
import lk.ijse.spring.shoeshop.entity.SaleDetails;
import lk.ijse.spring.shoeshop.entity.Sales;
import lk.ijse.spring.shoeshop.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {


    List<SaleDetails> findAllByOrderNo(Sales orderNo);

    boolean existsByOrderNoAndColorAndSizesAndInventory(Sales orderNo, String color, String size, Inventory inventory);

    SaleDetails findByOrderNoAndColorAndSizesAndInventory(Sales orderNo, String color, String size, Inventory inventory);
}

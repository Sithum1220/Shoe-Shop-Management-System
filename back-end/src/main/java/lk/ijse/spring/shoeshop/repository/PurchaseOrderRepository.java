package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Sales;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<Sales,String> {
    @Query(value = "SELECT order_no FROM Sales ORDER BY LENGTH(order_no) DESC, order_no DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    Sales findByOrderNo(String orderId);

    int countByPurchaseDate(LocalDate date);

    List<Sales> findAllByPurchaseDate(LocalDate localDate);

    @Query(value = "SELECT * FROM Sales  ORDER BY LENGTH(order_no) DESC", nativeQuery = true)
    List<Sales> findLastThreeOrders(Pageable pageable);
}

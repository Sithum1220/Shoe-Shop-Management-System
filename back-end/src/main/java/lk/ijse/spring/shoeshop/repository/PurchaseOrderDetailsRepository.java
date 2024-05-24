package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.SaleDetails;
import lk.ijse.spring.shoeshop.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {


    List<SaleDetails> findAllByOrderNo(Sales orderNo);
}

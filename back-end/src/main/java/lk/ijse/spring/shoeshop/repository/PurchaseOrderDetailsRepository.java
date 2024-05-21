package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {
}

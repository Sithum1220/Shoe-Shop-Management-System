package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, String> {
    @Query(value = "SELECT supplier_code FROM Supplier ORDER BY LENGTH(supplier_code) DESC, supplier_code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    boolean existsByEmail(String email);

    @Query("SELECT s.supplierName FROM Supplier s WHERE s.supplierCode = :id")
    String findNameById(String id);


    boolean existsByMobileNo(String mobileNo);
    boolean existsByLandNo(String landNo);

    List<Supplier> findBySupplierCodeStartingWithOrSupplierNameStartingWith(String supplierIdStart, String supplierNameStart);


}

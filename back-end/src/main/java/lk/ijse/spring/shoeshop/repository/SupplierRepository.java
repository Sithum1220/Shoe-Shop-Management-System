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

//    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Supplier s WHERE s.mobile_no = :mobileNo")
//    boolean checkByMobileNo(String mobileNo);

    boolean existsByMobileNo(String mobileNo);
    boolean existsByLandNo(String landNo);

    List<Supplier> findBySupplierCodeStartingWithOrSupplierNameStartingWith(String supplierIdStart, String supplierNameStart);


}

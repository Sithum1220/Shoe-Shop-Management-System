package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Query(value = "SELECT customer_id FROM Customer ORDER BY LENGTH(customer_id) DESC, customer_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    boolean existsByContactNo(String contactNo);
    boolean existsByEmail(String email);
}

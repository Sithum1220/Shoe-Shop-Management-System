package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Query(value = "SELECT customer_id FROM Customer ORDER BY LENGTH(customer_id) DESC, customer_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    boolean existsByContactNo(String contactNo);
    boolean existsByEmail(String email);
    List<Customer> findByCustomerIdStartingWithOrCustomerNameStartingWith(String customerIdStart, String customerNameStart);

    Customer findByCustomerId(String customerId);

    List<Customer> findAllByCustomerDob(Date customerDob);
}

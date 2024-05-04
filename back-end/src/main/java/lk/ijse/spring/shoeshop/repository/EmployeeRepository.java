package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query(value = "SELECT employee_id FROM Employee ORDER BY employee_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}

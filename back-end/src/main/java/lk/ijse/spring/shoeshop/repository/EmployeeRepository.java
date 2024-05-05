package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query(value = "SELECT employee_id FROM Employee ORDER BY LENGTH(employee_id) DESC, employee_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    boolean existsByContactNo(String contactNo);
    boolean existsByEmail(String email);
    boolean existsByEmergencyContact(String emergencyContact);

//    @Query(value = "SELECT employee_id FROM employee WHERE employee_id LIKE ?1 OR employee_name LIKE ?1;", nativeQuery = true)
//    List<String> searchEmployee(String id);

    List<Employee> findByEmployeeIdStartingWithOrEmployeeNameStartingWith(String employeeIdStart, String employeeNameStart);
}

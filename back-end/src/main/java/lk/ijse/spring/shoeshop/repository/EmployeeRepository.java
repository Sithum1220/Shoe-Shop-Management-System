package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query(value = "SELECT employee_id FROM Employee ORDER BY LENGTH(employee_id) DESC, employee_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    boolean existsByContactNo(String contactNo);

    boolean existsByEmail(String email);

    boolean existsByEmergencyContact(String emergencyContact);

//    @Query(value = "SELECT employee_id FROM employee WHERE employee_id LIKE ?1 OR employee_name LIKE ?1;", nativeQuery = true)
//    List<String> searchEmployee(String id);

    Employee findByEmployeeId(String employeeId);

    Employee findByEmail(String email);

    List<Employee> findAllByActiveStatus(boolean activeStatus);

    boolean existsByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);

    List<Employee> findAllByEmail(String email);

    List<Employee> findByEmployeeIdStartingWithAndActiveStatusOrEmployeeNameStartingWithAndActiveStatus
            (String employeeIdStart, boolean activeStatus1, String employeeNameStart, boolean activeStatus2);

//    List<Employee> findByEmailStartingWithAndActiveStatusOrEmployeeNameStartingWithAndActiveStatus
//            (String employeeEmailStart, boolean activeStatus1, String employeeNameStart, boolean activeStatus2);

    List<Employee> findByEmployeeNameStartingWithOrEmailStartingWith(String employeeNameStart, String email);

    
    boolean getEmployeeByEmployeeId(String employeeId);

    List<Employee> findAllByEmployeeDob(Date date);
}

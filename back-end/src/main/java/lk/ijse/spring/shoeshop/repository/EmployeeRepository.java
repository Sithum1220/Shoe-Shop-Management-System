package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}

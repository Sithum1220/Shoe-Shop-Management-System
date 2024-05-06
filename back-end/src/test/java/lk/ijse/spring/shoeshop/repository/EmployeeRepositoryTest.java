package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EmployeeRepositoryTest {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void getLastIndex() {
    }

    @Test
    void existsByContactNo() {
    }

    @Test
    void existsByEmail() {
    }

    @Test
    void existsByEmergencyContact() {
    }

    @Test
    void searchEmployee() {
//        List<Employee> strings = employeeRepository.findByEmployeeIdStartingWithOrEmployeeNameStartingWith("A","N");
//       for (Employee employee : strings) {
//           System.out.println(employee.getEmployeeId());
//       }
    }
}
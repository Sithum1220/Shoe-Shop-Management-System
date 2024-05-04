package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO employee);
    void updateEmployee(EmployeeDTO employee);
    void deleteEmployee(String id);
    EmployeeDTO getEmployee(String id);
    List<EmployeeDTO> getAllEmployees();
    String lastId();
}

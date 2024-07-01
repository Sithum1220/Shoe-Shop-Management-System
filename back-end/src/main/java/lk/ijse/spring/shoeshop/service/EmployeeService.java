package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO employee);
    void updateEmployee(EmployeeDTO employee);
    void deleteEmployee(String id);
    EmployeeDTO getEmployee(String id);
    List<EmployeeDTO> getAllEmployees();
    String lastId();
    List<EmployeeDTO> searchEmployeesById(String idOrName, boolean activeStatus);

    List<EmployeeDTO> findAllByActiveStatus(boolean activeStatus);

    EmployeeDTO getEmployeeByEmail(String email);

}

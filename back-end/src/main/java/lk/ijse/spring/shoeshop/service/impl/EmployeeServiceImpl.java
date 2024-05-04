package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    EmployeeRepository employeeRepository;
    ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void saveEmployee(EmployeeDTO employeeDTo) {
        if (!employeeRepository.existsById(employeeDTo.getEmployeeId())) {
            if (!employeeRepository.existsByEmail(employeeDTo.getEmail())) {
                if (!employeeRepository.existsByContactNo(employeeDTo.getContactNo())) {
                    if (employeeRepository.existsByEmergencyContact(employeeDTo.getEmergencyContact())) {
                        throw new EntityExistsException("Employee Contact Number already exists!");
                    }else {
                        System.out.println(employeeDTo.toString());

                        Employee employee = modelMapper.map(employeeDTo, Employee.class);

                        employee.setAddress(employeeDTo.getAddress());
                        employeeRepository.save(employee);
                    }
                    throw new EntityExistsException("Employee Contact Number already exists!");
                }
                throw new EntityExistsException("Email Address already exists!");
            }
            throw new EntityExistsException("Employee already exists!");
        }
    }

    @Override
    public void updateEmployee(EmployeeDTO employee) {
        if (employeeRepository.existsById(employee.getEmployeeId())) {
            if (employeeRepository.existsById(employee.getEmployeeId())) {}
            employeeRepository.save(modelMapper.map(employee, Employee.class));
        } else {
            throw new EntityExistsException("Employee Not Found!");
        }

    }

    @Override
    public void deleteEmployee(String id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
        } else {
            throw new EntityExistsException("Employee Not Found!");
        }
    }

    @Override
    public EmployeeDTO getEmployee(String id) {
        return modelMapper.map(employeeRepository.findById(id).get(), EmployeeDTO.class);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return modelMapper.map(employeeRepository.findAll(), new TypeToken<List<EmployeeDTO>>() {
        }.getType());
    }

    @Override
    public String lastId() {
        return employeeRepository.getLastIndex();
    }
}

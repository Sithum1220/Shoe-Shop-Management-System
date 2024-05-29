package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.User;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.repository.UserRepository;
import lk.ijse.spring.shoeshop.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    EmployeeRepository employeeRepository;
    UserRepository userRepository;
    ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public void saveEmployee(EmployeeDTO employeeDTo) {
        if (!employeeRepository.existsByEmail(employeeDTo.getEmail())) {
            if (!employeeRepository.existsByEmail(employeeDTo.getEmail())) {
                if (!employeeRepository.existsByContactNo(employeeDTo.getContactNo())) {
                    if (!employeeRepository.existsByEmergencyContact(employeeDTo.getEmergencyContact())) {

                        Employee employee = modelMapper.map(employeeDTo, Employee.class);

                        employee.setAddress(employeeDTo.getAddress());
                        employeeRepository.save(employee);
                        System.out.println(employeeDTo.getPassword());

//                        if (employeeDTo.getPassword() != null) {
//                            User user = new User(employeeDTo.getEmail(), employeeDTo.getPassword(), employeeDTo.getRole(), employee, employeeDTo.isActiveStatus());
//                            userRepository.save(user);
//                        }

                    } else {
                        throw new EntityExistsException("Emergency Contact Number already exists!");
                    }
                } else {
                    throw new EntityExistsException("Employee Contact Number already exists!");
                }
            } else {
                throw new EntityExistsException("Email Address already exists!");
            }
        } else {
            throw new EntityExistsException("Employee already exists!");
        }
    }

    @Override
    public void updateEmployee(EmployeeDTO employee) {
        if (employeeRepository.existsByEmployeeId(employee.getEmployeeId())) {
            employee.setActiveStatus(employeeRepository.existsByEmployeeId(employee.getEmployeeId()));
            employeeRepository.save(modelMapper.map(employee, Employee.class));
        } else {
            throw new EntityExistsException("Employee Not Found!");
        }

    }

    @Override
    public void deleteEmployee(String id) {
        if (employeeRepository.existsByEmployeeId(id)) {
            Employee byEmployeeId = employeeRepository.findByEmployeeId(id);
            byEmployeeId.setActiveStatus(false);
            employeeRepository.save(byEmployeeId);
            if (userRepository.existsById(byEmployeeId.getEmail())) {
                Optional<User> byEmail = userRepository.findByEmail(byEmployeeId.getEmail());
                if (byEmail.isPresent()) {
                    User user = byEmail.get();
                    user.setActiveStatus(false);
                    userRepository.save(user);
                }

            }
        } else {
            throw new EntityExistsException("Employee Not Found!");
        }
    }

    @Override
    public EmployeeDTO getEmployee(String id) {
        return modelMapper.map(employeeRepository.findByEmployeeId(id), EmployeeDTO.class);
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

    @Override
    public List<EmployeeDTO> searchEmployeesById(String idOrName, boolean activeStatus) {
        return modelMapper.map(employeeRepository.
                findByEmployeeIdStartingWithAndActiveStatusOrEmployeeNameStartingWithAndActiveStatus
                        (idOrName, activeStatus, idOrName, activeStatus), new
                TypeToken<List<EmployeeDTO>>() {
                }.getType());
    }

    @Override
    public List<EmployeeDTO> findAllByActiveStatus(boolean activeStatus) {
        List<Employee> allByActiveStatus = employeeRepository.findAllByActiveStatus(activeStatus);
        for (Employee employee : allByActiveStatus) {
            System.out.println(employee.getEmployeeId());
        }
        return modelMapper.map(employeeRepository.findAllByActiveStatus(activeStatus),
                new TypeToken<List<EmployeeDTO>>() {
                }.getType());
    }

    @Override
    public EmployeeDTO getEmployeeByEmail(String email) {
      return  modelMapper.map(employeeRepository.findByEmail(email),EmployeeDTO.class);
    }

}

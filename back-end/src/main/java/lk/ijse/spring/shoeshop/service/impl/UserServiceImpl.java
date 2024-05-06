package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.CustomDTO;
import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.User;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.repository.UserRepository;
import lk.ijse.spring.shoeshop.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    EmployeeRepository employeeRepository;
    UserRepository userRepository;
    ModelMapper modelMapper;

    public UserServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public List<CustomDTO> findAllByActiveStatus(boolean activeStatus) {
        List<User> allByActiveStatus = userRepository.findAllByActiveStatus(activeStatus);
        List<CustomDTO> customDTOs = new ArrayList<>();

        for (User user : allByActiveStatus) {
            List<Employee> allByEmail = employeeRepository.findAllByEmail(user.getEmail());
            for (Employee employee : allByEmail) {
                CustomDTO customDTO = new CustomDTO(); // Create a new CustomDTO for each Employee
                customDTO.setContactNo(employee.getContactNo());
                customDTO.setEmployeeName(employee.getEmployeeName());
                customDTO.setEmail(employee.getEmail());
                customDTO.setRole(employee.getRole());
                customDTO.setEmployeeId(employee.getEmployeeId());
                customDTOs.add(customDTO);
            }
        }



        return customDTOs;
    }
}
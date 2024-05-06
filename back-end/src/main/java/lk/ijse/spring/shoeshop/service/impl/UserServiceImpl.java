package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.CustomDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;
import lk.ijse.spring.shoeshop.embedded.Role;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.User;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.repository.UserRepository;
import lk.ijse.spring.shoeshop.service.UserService;
import org.modelmapper.ModelMapper;
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
                CustomDTO customDTO = new CustomDTO();
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

    @Override
    public void deleteUser(String id) {
        if (userRepository.existsById(id)) {
            User byEmail = userRepository.findByEmail(id);
            byEmail.setActiveStatus(false);
            Employee employee = employeeRepository.findByEmail(id);
            employee.setRole(Role.OTHER);
            userRepository.save(byEmail);
            employeeRepository.save(employee);
        }
    }

    @Override
    public UserDTO getUser(String id) {
        return modelMapper.map(userRepository.findById(id).get(), UserDTO.class);

    }

    @Override
    public List<CustomDTO> searchUsersById(String idOrName, boolean activeStatus) {

        List<Employee> employeeList = employeeRepository.findByEmployeeNameStartingWithOrEmailStartingWith(idOrName, idOrName);

        List<CustomDTO> customDTOs = new ArrayList<>();

        for (Employee employee : employeeList) {
            if (userRepository.existsByActiveStatusAndEmail(activeStatus, employee.getEmail())) {
                CustomDTO customDTO = new CustomDTO();
                customDTO.setEmployeeName(employee.getEmployeeName());
                customDTO.setEmail(employee.getEmail());
                customDTO.setRole(employee.getRole());
                customDTO.setContactNo(employee.getContactNo());
                customDTOs.add(customDTO);
            }
        }
        return customDTOs;

    }

}
package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.util.GenerateNewId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class EmployeeServiceImplTest {

    @Autowired
    private EmployeeServiceImpl employeeService;
    @Autowired
    private GenerateNewId generateNewId;
    @Autowired
    private EmployeeRepository employeeRepository;

    //
//    EmployeeDTO employee(){
//
//
////        EmployeeDTO employee2 = new EmployeeDTO("E00-002", "Jane Smith", "profile2.jpg", Gender.FEMALE,
////                "Active", "Branch2", "Supervisor", Role.USER, new Date(), new Date(),
////                new Address("123", "lane","City","State", "12345"), "456-789-0123", "jane@example.com",
////                "John Smith", "654-321-0987");
////
////        EmployeeDTO employee3 = new EmployeeDTO("E00-003", "Alice Johnson", "profile3.jpg", Gender.FEMALE,
////                "Inactive", "Branch1", "Associate", Role.USER, new Date(), new Date(),
////                new Address("123", "lane","City","State", "12345"), "789-012-3456", "alice@example.com",
////                "Bob Johnson", "321-098-7654");
////
////        EmployeeDTO employee4 = new EmployeeDTO("E00-004", "Bob Brown", "profile4.jpg", Gender.MALE,
////                "Active", "Branch2", "Associate", Role.USER, new Date(), new Date(),
////                new Address("123", "lane","City","State", "12345"), "987-654-3210", "bob@example.com",
////                "Betty Brown", "012-345-6789");
////
////        EmployeeDTO employee5 = new EmployeeDTO("E00-005", "Emily Davis", "profile5.jpg", Gender.FEMALE,
////                "Active", "Branch1", "Associate", Role.USER, new Date(), new Date(),
////                new Address("123", "lane","City","State", "12345"), "654-321-0987", "emily@example.com",
////                "Edward Davis", "789-012-3456");
//        return employee1;
//    }
    @Test
    void saveEmployee() {

//     EmployeeDTO employee5 = new EmployeeDTO("E00-005", "Emily Davis", "profile5.jpg", Gender.FEMALE,
//                "Active", "Branch1", "Associate", Role.USER, new Date(), new Date(),
//                new Address("123", "lane","City","State", "12345"), "654-321-0987", "emily@example.com",
//                "Edward Davis", "789-012-3456");
//        employeeService.saveEmployee(employee5);

//        EmployeeDTO employee1 = new EmployeeDTO(GenerateNewId.nextId(employeeRepository.getLastIndex(), "E00"), "John Doe", "profile1.jpg", Gender.MALE,
//                "Active", "Branch1", "Manager", Role.ADMIN, new Date(), new Date(),
//                new Address("123", "lane", "City", "State", "12345"), "123-456-7890", "john@example.com",
//                "Jane Doe", "987-654-3210");


        List<EmployeeDTO> allEmployees = employeeService.getAllEmployees();

        for (EmployeeDTO employeeDTO : allEmployees) {
            System.out.println(employeeDTO.toString());
        }

    }

    @Test
    void updateEmployee() {
    }

    @Test
    void deleteEmployee() {
    }

    @Test
    void getEmployee() {
    }

    @Test
    void getAllEmployees() {
//        List<EmployeeDTO> allEmployees = employeeService.getAllEmployees();

//        for (EmployeeDTO employeeDTO:allEmployees){
//            System.out.println(employeeDTO.toString());
//        }

    }

    @Test
    void lastId() {
    }

    @Test
    void searchEmployeesById() {

    }
}
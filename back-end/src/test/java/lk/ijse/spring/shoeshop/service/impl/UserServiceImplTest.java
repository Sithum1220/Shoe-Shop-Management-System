package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.CustomDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {

    @Autowired
    private UserServiceImpl userService;

    @Test
    void findAllByActiveStatus() {
        List<CustomDTO> allByActiveStatus = userService.findAllByActiveStatus(true);
        for (CustomDTO customDTO : allByActiveStatus) {
            System.out.println(customDTO.toString());
        }
    }

    @Test
    void testFindAllByActiveStatus() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void getUser() {
    }

    @Test
    void searchUsersById() {
        List<CustomDTO> s = userService.searchUsersById("i", true);
//
        for (CustomDTO customDTO : s) {

            System.out.println(customDTO.toString());
        }
    }
}
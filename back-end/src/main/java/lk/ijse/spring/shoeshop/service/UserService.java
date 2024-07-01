package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.CustomDTO;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    List<CustomDTO> findAllByActiveStatus(boolean activeStatus);
    void deleteUser(String id);
    UserDTO getUser(String id);
    List<CustomDTO> searchUsersById(String idOrName, boolean activeStatus);

    UserDetailsService userDetailService();

}

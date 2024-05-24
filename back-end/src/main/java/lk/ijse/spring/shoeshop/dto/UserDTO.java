package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private String email;
    private String password;
    private Role role;
    private EmployeeDTO employee;
    private boolean activeStatus;
}

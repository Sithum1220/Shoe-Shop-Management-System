package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private Role role;
    private String email;
    private String employeeName;
    private String contactNo;
    private String employeeId;
}

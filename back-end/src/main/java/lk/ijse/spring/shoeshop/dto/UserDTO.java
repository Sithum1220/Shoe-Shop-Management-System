package lk.ijse.spring.shoeshop.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lk.ijse.spring.shoeshop.embedded.Role;
import lk.ijse.spring.shoeshop.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String email;
    private String password;
    private Role role;
    private Employee employee;
    private boolean activeStatus;
}
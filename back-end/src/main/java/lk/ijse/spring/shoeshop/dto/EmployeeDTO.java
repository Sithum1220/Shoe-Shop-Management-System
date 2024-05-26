package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.embedded.Address;
import lk.ijse.spring.shoeshop.enumeration.Gender;
import lk.ijse.spring.shoeshop.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

    private String employeeId;
    private String employeeName;
    private String proPic;
    private Gender gender;
    private String employeeStatus;
    private String branch;
    private String designation;
    private Role role;
    private Date employeeDob;
    private Date joinDate;
    private Address address;
    private String contactNo;
    private String email;
    private String guardianName;
    private String emergencyContact;
    private boolean activeStatus;
    private String password;
}

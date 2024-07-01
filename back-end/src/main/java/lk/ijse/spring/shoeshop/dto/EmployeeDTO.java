package lk.ijse.spring.shoeshop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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

    @NotNull(message = "Employee ID is required")
    @Pattern(regexp = "^E\\d{2}-\\d{2}[1-9]$", message = "ID is not valid")
    private String employeeId;

    @NotNull(message = "Employee Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Employee Name is Not Valid")
    private String employeeName;
    private String proPic;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Employee Status is Not Valid")
    private String employeeStatus;

    @NotNull(message = "Branch is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Branch is not valid")
    private String branch;

    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "designation is not valid")
    private String designation;

    @NotNull(message = "Role is required")
    private Role role;

    @NotNull(message = "Dob is required")
    private Date employeeDob;

    @NotNull(message = "Join Date is required")
    private Date joinDate;

    private Address address;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is Not Valid")
    private String contactNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is Not Valid")
    private String email;

    @NotNull(message = "Guardian Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Guardian Name is Not Valid")
    private String guardianName;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is Not Valid")
    private String emergencyContact;
    private boolean activeStatus;
    private String password;
}

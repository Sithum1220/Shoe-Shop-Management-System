package lk.ijse.spring.shoeshop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeshop.embedded.Address;
import lk.ijse.spring.shoeshop.enumeration.Gender;
import lk.ijse.spring.shoeshop.enumeration.LoyaltyLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    @NotNull(message = "Customer ID is required")
    @Pattern(regexp = "^C\\d{2}-\\d{2}[1-9]$", message = "ID is not valid")
    private String customerId;

    @NotNull(message = "Customer Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Customer Name is Not Valid")
    private String customerName;

    @NotNull(message = "Customer Gender is required")
    private Gender gender;

    @NotNull(message = "Join Date is required")
    private Date loyaltyDate;
    private LoyaltyLevel level;
    private Integer totalPoints;

    @NotNull(message = "Dob is required")
    private Date customerDob;

    private Address address;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^(?:7|0|\\+94)[0-9]{9,10}$", message = "Mobile Number is Not Valid")
    private String contactNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is Not Valid")
    private String email;
    private Timestamp recentPurchase;
}

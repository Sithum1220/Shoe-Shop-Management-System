package lk.ijse.spring.shoeshop.dto;

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
    private String customerId;
    private String customerName;
    private Gender gender;
    private Date loyaltyDate;
    private LoyaltyLevel level;
    private Integer totalPoints;
    private Date customerDob;
    private Address address;
    private String contactNo;
    private String email;
    private Timestamp recentPurchase;
}

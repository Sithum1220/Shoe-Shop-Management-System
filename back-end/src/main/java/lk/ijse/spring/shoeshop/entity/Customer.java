package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.*;
import lk.ijse.spring.shoeshop.embedded.Address;
import lk.ijse.spring.shoeshop.embedded.Gender;
import lk.ijse.spring.shoeshop.embedded.LoyaltyLevel;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Customer {

    @Id
    private String customerId;

    private String customerName;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Temporal(TemporalType.DATE)
    private Date loyaltyDate;

    @Enumerated(EnumType.STRING)
    private LoyaltyLevel level;

    private Integer totalPoints;

    @Temporal(TemporalType.DATE)
    private Date customerDob;

    @Embedded
    private Address address;

    @Column(unique = true)
    private String contactNo;
    @Column(unique = true)
    private String email;
    private LocalDate recentPurchase;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "customerId")
    private List<Sales> sales = new ArrayList<>();
}


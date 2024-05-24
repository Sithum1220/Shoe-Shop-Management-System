package lk.ijse.spring.shoeshop.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "orderNo")
public class Sales {

    @Id
    private String orderNo;

    @CreationTimestamp
    private LocalDate purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;
    private String customerName;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customerId;

//    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "orderNo")
//    private List<SaleDetails> saleDetails = new ArrayList<>();
}

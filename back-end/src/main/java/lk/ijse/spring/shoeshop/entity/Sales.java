package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Sales {

    @Id
    private String orderNo;

    @CreationTimestamp
    private LocalDateTime purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;
    @ManyToOne
    @JoinColumn(name = "customer_name", nullable = false)
    private Customer customerName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "orderNo")
    private List<SaleDetails> saleDetails = new ArrayList<>();
}

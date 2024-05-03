package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class AdminPanel {
    @Id
    private String id;
    private Double totalSales;
    private Double totalProfit;
    private String mostSaleItem;
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;
}

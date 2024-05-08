package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Inventory {
    @Id
    private String itemCode;
    private String itemDesc;
    @Column(columnDefinition = "LONGTEXT")
    private String itemPicture;
    private int qty;
    private int originalQty;
    private String category;
    private Integer size;
    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false, unique = true)
    private Supplier supplier;
    private String supplierName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY,mappedBy = "inventory")
    private List<SaleDetails> saleDetails = new ArrayList<>();
}

package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class SaleDetails {

//    @EmbeddedId
//    private SaleDetailPK orderDetailPK;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_Details_id")
    private int id;

    @Column(name = "itm_qty")
    private int itmQTY;

    @ManyToOne
    @JoinColumn(name = "order_no")
    private Sales orderNo;

    @ManyToOne
    @JoinColumn(name = "item_code")
    private Inventory inventory;

    private Double itmTotal;

    private String color;
    private String sizes;

    @ManyToOne
    @JoinColumn(name = "sizeId")
    private Size size;

    public SaleDetails(Size size, String sizes, String color, Double itmTotal, Inventory inventory, Sales orderNo, int itmQTY) {
        this.size = size;
        this.sizes = sizes;
        this.color = color;
        this.itmTotal = itmTotal;
        this.inventory = inventory;
        this.orderNo = orderNo;
        this.itmQTY = itmQTY;
    }
}

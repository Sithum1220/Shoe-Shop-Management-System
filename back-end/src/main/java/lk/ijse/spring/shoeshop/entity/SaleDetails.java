package lk.ijse.spring.shoeshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
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
    private String status;

    @ManyToOne
    @JoinColumn(name = "sizeId")
    private Size size;

    public SaleDetails(Size size, String sizes, String color, Double itmTotal, Inventory inventory, Sales orderNo, int itmQTY,String status) {
        this.size = size;
        this.sizes = sizes;
        this.color = color;
        this.itmTotal = itmTotal;
        this.inventory = inventory;
        this.orderNo = orderNo;
        this.itmQTY = itmQTY;
        this.status = status;
    }
}

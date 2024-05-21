package lk.ijse.spring.shoeshop.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SaleDetailPK implements Serializable {
    @Column(name = "order_no")
    private String orderNo;
    @Column(name = "item_code")
    private String itemCode;
}

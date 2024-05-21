package lk.ijse.spring.shoeshop.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesCustomDTO {
    private SaleDetailPKDTO saleDetailPK;
    private String paymentMethod;
    private CustomerDTO customerId;
    private int itmQTY;
    private SizeDTO sizeDTO;
    private double unitPrice;
}

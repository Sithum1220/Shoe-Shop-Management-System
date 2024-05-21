package lk.ijse.spring.shoeshop.dto;

import jakarta.persistence.Entity;
import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Inventory;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalesCustomDTO {

    private String orderNo;
    private String paymentMethod;
    private Customer customerId;
    private int itmQTY;
    private Inventory inventory;
    private double unitPrice;
}

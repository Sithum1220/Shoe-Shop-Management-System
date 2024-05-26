package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.enumeration.Order_Status;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDetailsDTO {

    private int id;

    private int itmQTY;

    private int returnedQty;

    private SaleDTO orderNo;

    private InventoryDTO inventory;

    private Order_Status status;

    private Double itmTotal;

    private SizeDTO sizeDTO;

    private String color;

    private String size;
}

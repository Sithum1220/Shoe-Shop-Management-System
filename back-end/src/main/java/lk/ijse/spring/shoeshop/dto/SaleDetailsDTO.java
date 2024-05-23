package lk.ijse.spring.shoeshop.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDetailsDTO {
    private int itmQTY;

    private SaleDTO orderNo;

    private InventoryDTO inventoryDTO;

    private Double itmTotal;

    private SizeDTO sizeDTO;

    private String color;

    private String size;
}

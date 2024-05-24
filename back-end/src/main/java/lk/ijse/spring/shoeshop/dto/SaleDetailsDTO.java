package lk.ijse.spring.shoeshop.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDetailsDTO {

    private int id;

    private int itmQTY;

    private SaleDTO orderNo;

    private InventoryDTO inventory;

    private String status;

    private Double itmTotal;

    private SizeDTO sizeDTO;

    private String color;

    private String size;
}

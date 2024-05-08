package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
    private String itemCode;
    private String itemDesc;
    private String itemPicture;
    private int qty;
    private int originalQty;
    private String category;
    private Integer size;
    private Supplier supplier;
    private String supplierName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
}

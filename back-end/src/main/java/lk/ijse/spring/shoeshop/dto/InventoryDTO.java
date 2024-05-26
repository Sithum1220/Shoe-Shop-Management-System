package lk.ijse.spring.shoeshop.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lk.ijse.spring.shoeshop.entity.Size;
import lk.ijse.spring.shoeshop.entity.Supplier;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {

    private String itemCode;
    private String itemDesc;
    private String itemPicture;
    private int qty;
    private int originalQty;
    private String category;
    private Supplier supplier;
    private String supplierName;
    private Double salePrice;
    private Double buyPrice;
    private Double expectedProfit;
    private Double profitMargin;
    private String status;
    @JsonProperty("sizeList")
    private List<SizeDTO> sizeList;
}

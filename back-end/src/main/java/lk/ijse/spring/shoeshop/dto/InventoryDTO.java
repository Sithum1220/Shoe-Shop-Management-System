package lk.ijse.spring.shoeshop.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeshop.entity.Size;
import lk.ijse.spring.shoeshop.entity.Supplier;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {

    @NotNull(message = "Item Code is required")
    @Pattern(regexp = "^[A-Z]{3}\\d{4}[1-9]$", message = "Item Code is not valid")
    private String itemCode;

    @NotNull(message = "Description Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Description is Not Valid")
    private String itemDesc;
    private String itemPicture;
    private int qty;
    private int originalQty;
    private String category;
    private Supplier supplier;

    @NotNull(message = "Supplier Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Employee Name is Not Valid")
    private String supplierName;

    @NotNull(message = "Price is required")
    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Price is Not Valid")
    private Double salePrice;

    @NotNull(message = "Price is required")
    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Price is Not Valid")
    private Double buyPrice;

    private Double expectedProfit;
    private Double profitMargin;
    private String status;
    @JsonProperty("sizeList")
    private List<SizeDTO> sizeList;
}

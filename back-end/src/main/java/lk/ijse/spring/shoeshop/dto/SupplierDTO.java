package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.enumeration.Category;
import lk.ijse.spring.shoeshop.embedded.InAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {
    private String supplierCode;
    private String supplierName;
    private Category category;
    private InAddress address;
    private String mobileNo;
    private String landNo;
    private String email;
}

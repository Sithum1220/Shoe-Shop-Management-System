package lk.ijse.spring.shoeshop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeshop.enumeration.Category;
import lk.ijse.spring.shoeshop.embedded.InAddress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {

    @NotNull(message = "Supplier ID is required")
    @Pattern(regexp = "^S\\d{2}-\\d{2}[1-9]$", message = "Id is not valid")
    private String supplierCode;

    @NotNull(message = "Supplier Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Employee Name is Not Valid")
    private String supplierName;
    private Category category;
    private InAddress address;

    @NotNull(message = "Mobile Number is required")
    @Pattern(regexp = "^\\+?(\\d{1,3})?[-.\\s]?(\\(?\\d{1,4}\\)?)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$", message = "Mobile Number is Not Valid")
    private String mobileNo;

    @NotNull(message = "land Number is required")
    @Pattern(regexp = "^\\+?(\\d{1,3})?[-.\\s]?(\\(?\\d{1,4}\\)?)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$", message = "Land Number is Not Valid")
    private String landNo;

    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "Email is Not Valid")
    private String email;
}

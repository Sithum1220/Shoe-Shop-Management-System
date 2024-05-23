package lk.ijse.spring.shoeshop.dto;

import lk.ijse.spring.shoeshop.entity.Customer;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDTO {

    private String orderNo;

    private LocalDate purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;

    private String customerName;

    private CustomerDTO customerId;

    private  List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}

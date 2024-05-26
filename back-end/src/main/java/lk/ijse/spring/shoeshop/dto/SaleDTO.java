package lk.ijse.spring.shoeshop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.enumeration.Order_Status;
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

    private Order_Status status;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;

    private String customerName;

    private CustomerDTO customerId;

    private  List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}

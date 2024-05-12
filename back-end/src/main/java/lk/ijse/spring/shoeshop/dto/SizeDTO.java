package lk.ijse.spring.shoeshop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.ManyToOne;
import lk.ijse.spring.shoeshop.entity.Inventory;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SizeDTO {
    private int id;
    private String size;
    private String color;
    private int qty;
    private String itemCode;
}

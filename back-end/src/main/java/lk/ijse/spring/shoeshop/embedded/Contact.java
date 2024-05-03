package lk.ijse.spring.shoeshop.embedded;

import jakarta.persistence.Embeddable;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Embeddable
@Getter
@Setter
public class Contact {
    private String mobileNo;
    private String landNo;
}

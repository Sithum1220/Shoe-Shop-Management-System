package lk.ijse.spring.shoeshop.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GenerateNewId {

    public static String nextId(String lastId, String idType) {

        try {

            String[] split = lastId.split("-");

            String idlastNumber = split[1];
            System.out.println(idlastNumber);

            int finalLastNumber = Integer.parseInt(idlastNumber)+1;

            System.out.println(finalLastNumber);
            return split[0] +"-00"+ finalLastNumber;

        } catch (Exception e) {
            return idType + "-001";
        }
    }
}

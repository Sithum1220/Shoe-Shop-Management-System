package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByActiveStatus(boolean activeStatus);
    User findByEmail(String email);
}

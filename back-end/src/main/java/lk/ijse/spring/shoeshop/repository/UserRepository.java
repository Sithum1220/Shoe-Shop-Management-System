package lk.ijse.spring.shoeshop.repository;

import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByActiveStatus(boolean activeStatus);

    Optional<User> findByEmail(String email);

    boolean existsByActiveStatusAndEmail(boolean activeStatus, String email);

    Optional<User> findByResetToken(String resetToken);
}

package lk.ijse.spring.shoeshop.entity;

import jakarta.persistence.*;
import lk.ijse.spring.shoeshop.embedded.Role;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {


    @Id
    private String email;


    private String password;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Role role;

    @ManyToOne
    private Employee employee;
    private boolean activeStatus;

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        HashSet<GrantedAuthority> authorities = new HashSet<>();
//        authorities.add(new SimpleGrantedAuthority(
//                "Role_"+role.name()));
//        return authorities;
//    }
//
//    @Override
//    public String getUsername() {
//        return email;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
}

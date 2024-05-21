package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Customer;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO customer);
    void updateCustomer(CustomerDTO customer);
    void deleteCustomer(String id);
    CustomerDTO getCustomer(String id);
    List<CustomerDTO> getAllCustomers();
    String lastId();
    List<CustomerDTO> searchCustomersById(String idOrName);

    Object getCustomerDetailsForOrder(CustomerDTO customerDTO);
}

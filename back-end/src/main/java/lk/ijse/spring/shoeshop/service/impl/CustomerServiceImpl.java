package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.CustomerDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.repository.CustomerRepository;
import lk.ijse.spring.shoeshop.repository.SupplierRepository;
import lk.ijse.spring.shoeshop.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    CustomerRepository customerRepository;
    ModelMapper modelMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {

        if (!customerRepository.existsById(customerDTO.getCustomerId())) {
            if (!customerRepository.existsByEmail(customerDTO.getEmail())) {
                if (!customerRepository.existsByContactNo(customerDTO.getContactNo())) {
                    Customer customer = modelMapper.map(customerDTO, Customer.class);
                    customer.setAddress(customerDTO.getAddress());
                    customerRepository.save(customer);
                }else {
                    throw new EntityExistsException("Contact Number already exists!");
                }
            }else {
                throw new EntityExistsException("Email Address already exists!");
            }
        }else {
            throw new EntityExistsException("Customer already exists!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO customer) {

    }

    @Override
    public void deleteCustomer(String id) {

    }

    @Override
    public CustomerDTO getCustomer(String id) {
        return null;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return modelMapper.map(customerRepository.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public String lastId() {
        return customerRepository.getLastIndex();
    }
}

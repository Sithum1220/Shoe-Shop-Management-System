package lk.ijse.spring.shoeshop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.entity.Supplier;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import lk.ijse.spring.shoeshop.repository.SupplierRepository;
import lk.ijse.spring.shoeshop.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    SupplierRepository supplierRepository;
    ModelMapper modelMapper;

    public SupplierServiceImpl(SupplierRepository supplierRepository, ModelMapper modelMapper) {
        this.supplierRepository = supplierRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void saveSupplier(SupplierDTO supplierDto) {
        if (!supplierRepository.existsById(supplierDto.getSupplierCode())) {
            if (!supplierRepository.existsByEmail(supplierDto.getEmail())) {
                if (!supplierRepository.existsByMobileNo(supplierDto.getMobileNo())) {
                    if (!supplierRepository.existsByLandNo(supplierDto.getLandNo())) {
                        Supplier supplier = modelMapper.map(supplierDto, Supplier.class);
                        supplier.setAddress(supplierDto.getAddress());
                        supplierRepository.save(supplier);
                    } else {
                        throw new DuplicateKeyException("Land Number already exists");
                    }

                } else {
                    throw new DuplicateKeyException("Mobile Number already exists");
                }

            } else {
                throw new DuplicateKeyException("Email already exists");
            }
        } else {
            throw new DuplicateKeyException("Supplier already exists");

        }
    }

    @Override
    public void updateSupplier(SupplierDTO supplierDto) {
        if (supplierRepository.existsById(supplierDto.getSupplierCode())) {
            try {
                supplierRepository.save(modelMapper.map(supplierDto, Supplier.class));

            }catch (Exception e){
                e.printStackTrace();
            }
        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public void deleteSupplier(String id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public SupplierDTO getSupplier(String id) {
        return modelMapper.map(supplierRepository.findById(id).get(), SupplierDTO.class);

    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return modelMapper.map(supplierRepository.findAll(), new TypeToken<List<SupplierDTO>>() {
        }.getType());
    }

    @Override
    public String lastId() {
        return supplierRepository.getLastIndex();
    }

    @Override
    public List<SupplierDTO> searchSuppliersById(String idOrName) {
        return modelMapper.map(supplierRepository.findBySupplierCodeStartingWithOrSupplierNameStartingWith(idOrName,idOrName),new TypeToken<List<SupplierDTO>>() {}.getType());

    }
}

package lk.ijse.spring.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.dto.SupplierDTO;
import lk.ijse.spring.shoeshop.entity.Supplier;

import java.util.List;

public interface SupplierService {
    void saveSupplier(SupplierDTO supplierDto);
    void updateSupplier(SupplierDTO supplierDto);
    void deleteSupplier(String id);
    SupplierDTO getSupplier(String id);
    List<SupplierDTO> getAllSuppliers();
    String lastId();
    List<SupplierDTO> searchSuppliersById(String idOrName);

}

package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.dto.SalesCustomDTO;
import lk.ijse.spring.shoeshop.repository.PurchaseOrderRepository;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    PurchaseOrderRepository purchaseOrderRepository;

    public PurchaseOrderServiceImpl(PurchaseOrderRepository repository) {
        this.purchaseOrderRepository = repository;
    }

    @Override
    public String lastId() {
        return purchaseOrderRepository.getLastIndex();
    }

    @Override
    public void purchaseOrder(List<SalesCustomDTO> salesCustomDTOList) {
            for (SalesCustomDTO salesCustomDTO : salesCustomDTOList) {
                System.out.println(salesCustomDTO);
            }
    }
}

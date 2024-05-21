package lk.ijse.spring.shoeshop.service.impl;

import lk.ijse.spring.shoeshop.repository.PurchaseOrderRepository;
import lk.ijse.spring.shoeshop.service.PurchaseOrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}

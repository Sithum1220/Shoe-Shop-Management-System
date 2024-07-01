package lk.ijse.spring.shoeshop.service.impl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class PurchaseOrderServiceImplTest {
    @Autowired
    private PurchaseOrderServiceImpl purchaseOrderService;

    @Test
    void lastId() {
    }

    @Test
    void purchaseOrder() {
    }

    @Test
    void getAllOrders() {
    }

    @Test
    void getAllOrderDetails() {
    }

    @Test
    void canBeReturned() {
    }

    @Test
    void returnFullOrder() {
    }

    @Test
    void returnOneItem() {
    }

    @Test
    void totalSalesOfASelectedDate() {
    }

    @Test
    void totalProfitOfASelectedDate() {
        LocalDate date = LocalDate.now();
        System.out.println(purchaseOrderService.totalProfitOfASelectedDate(date));
    }

    @Test
    void mostSoldItemAndColor() {
        LocalDate date = LocalDate.parse("2024-05-27");

        System.out.println(purchaseOrderService.mostSoldItemAndColor(date));
    }
}
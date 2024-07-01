package lk.ijse.spring.shoeshop.service.util;

import jakarta.mail.MessagingException;
import lk.ijse.spring.shoeshop.entity.Customer;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.repository.CustomerRepository;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.MonthDay;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Component
public class BirthdayReminder {

    @Autowired
    CustomerRepository customerRepo;
    @Autowired
    EmployeeRepository employeeRepo;
    @Autowired
    private JavaMailSender mailSender;
//    @Autowired
//    Sender sender;

    @Scheduled(cron = "0 0 0 * * ?")
    public void sendBirthdayWishes() {
        LocalDate localDate = LocalDate.now();
        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Customer> cus = customerRepo.findAllByCustomerDob(date);
        for (Customer c : cus) {
            sendEmail(c,"cus");
        }
        List<Employee> emp = employeeRepo.findAllByEmployeeDob(date);
        for (Employee e : emp) {
            sendEmail(e,"emp");
        }
    }
    public void sendEmail(Object ob,String type) {
        String name = "";
        String mail = "";
        if (type.equals("cus")){
            Customer cus = (Customer) ob;
            name = cus.getCustomerName();
            mail = cus.getEmail();
        }
        else if (type.equals("emp")){
            Employee emp = (Employee) ob;
            name = emp.getEmployeeName();
            mail = emp.getEmail();
        }
        String mass= "Dear " + name + ",\n\n" +
                "Wishing you a wonderful Birthday filled with joy and happiness!\n\n" +
                "Best regards,\n" +
                "Hello Shoes Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail);
        message.setSubject("Welcome to Hello Shoes!");
        message.setText(mass);
        mailSender.send(message);

//            if (mailSender.checkConnection()) {
//                mailSender.outMail(mass, mail, "Welcome to Hello Shoes!");
//            } else {
//                System.err.println("Failed connect mail server.");
//            }
    }
}

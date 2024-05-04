package lk.ijse.spring.shoeshop.api;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;
import lk.ijse.spring.shoeshop.entity.Employee;
import lk.ijse.spring.shoeshop.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/upload")
@CrossOrigin
public class ImageUploadController {
    private static final String UPLOAD_DIR = "/Users/sithumimesh/Documents/IDEA PROJECTS/Shoe-Shop-Management-System/back-end/src/main/java/lk/ijse/spring/shoeshop/dto/";

    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping
    public ResponseEntity<String> handleBase64Upload(@RequestBody String base64String) {
        System.out.println(base64String);
        if (base64String == null || base64String.isEmpty()) {
            return ResponseEntity.badRequest().body("Base64 string is empty");
        }

        try {
            // Decode the Base64 string
            byte[] decodedBytes = Base64.getDecoder().decode(base64String);

            // Write the decoded bytes to a file
            String fileName = Arrays.toString(decodedBytes) +".jpg"; // You can give any filename
            String filePath = UPLOAD_DIR + fileName;
            FileOutputStream outputStream = new FileOutputStream(filePath);
            outputStream.write(decodedBytes);
            outputStream.close();

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getImageById(@PathVariable("id") String id) {
        Optional<Employee> optionalImageEntity = employeeRepository.findById(id);
        return optionalImageEntity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

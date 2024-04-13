package los.nortenos.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/motion")
public class MotionController {

    @GetMapping("")
    public ResponseEntity<?> motion() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            Map jsonData = objectMapper.readValue(new File("src/main/java/los/nortenos/backend/static/motion.json"), Map.class);

            return ResponseEntity.ok(jsonData);
        }  catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> motionPost(@RequestBody Map<String, Object> data) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonData = objectMapper.writeValueAsString(data);
            FileWriter fileWriter = new FileWriter("src/main/java/los/nortenos/backend/static/motion.json");
            fileWriter.write(jsonData);
            fileWriter.close();

            return ResponseEntity.accepted().build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}

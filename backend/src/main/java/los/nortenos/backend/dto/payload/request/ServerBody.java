package los.nortenos.backend.dto.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ServerBody {

    @NotBlank
    private String name;

    @NotBlank
    private String description;
}

package los.nortenos.backend.dto.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PostBody {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

}

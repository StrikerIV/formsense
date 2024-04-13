package los.nortenos.backend.dto.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChannelBody {
    @NotBlank
    private String name;

    @NotBlank
    private String description;
}

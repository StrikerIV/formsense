package los.nortenos.backend.dto.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "channels",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @Size(max = 200)
    private String description;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "channel_uid")
    private Set<Post> posts = new HashSet<>();
}

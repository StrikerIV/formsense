package los.nortenos.backend.dto.database;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "servers",
uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
})
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @Size(max = 200)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "servers_users",
            joinColumns = @JoinColumn(name = "group_uid"),
            inverseJoinColumns = @JoinColumn(name = "user_uid")
    )
    private Set<User> users;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "server_uid")
    private Set<Channel> channels = new HashSet<>();

}

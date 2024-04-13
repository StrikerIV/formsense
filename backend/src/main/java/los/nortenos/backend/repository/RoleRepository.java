package los.nortenos.backend.repository;

import los.nortenos.backend.dto.database.EnumRole;
import los.nortenos.backend.dto.database.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(EnumRole name);
}
package los.nortenos.backend.repository;

import los.nortenos.backend.dto.database.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {
    @Query(value = "select * from servers", nativeQuery = true)
    List<Server> findAll();

    Boolean existsByName(String name);
}

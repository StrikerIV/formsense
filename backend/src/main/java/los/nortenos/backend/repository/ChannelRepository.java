package los.nortenos.backend.repository;

import los.nortenos.backend.dto.database.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Boolean existsByName(String name);
}

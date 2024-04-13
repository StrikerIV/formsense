package los.nortenos.backend.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import los.nortenos.backend.dto.database.Channel;
import los.nortenos.backend.dto.database.Server;
import los.nortenos.backend.dto.database.User;
import los.nortenos.backend.dto.payload.request.ChannelBody;
import los.nortenos.backend.dto.payload.request.ServerBody;
import los.nortenos.backend.dto.payload.response.Message;
import los.nortenos.backend.repository.ChannelRepository;
import los.nortenos.backend.repository.ServerRepository;
import los.nortenos.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.hibernate.internal.util.collections.CollectionHelper.setOf;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/servers")
public class ServerController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ServerRepository serverRepository;

    @Autowired
    ChannelRepository channelRepository;

    @GetMapping("")
    public List<Server> getServers() {
        return serverRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> addServer(Authentication authentication,
                                       @Valid @RequestBody ServerBody serverBody) {
        if(serverRepository.existsByName(serverBody.getName())) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: A server by this name already exists."));
        }

        Optional<User> authenticatedUser = userRepository.findByUsername(authentication.getName());
        Set<User> usersSet = new HashSet<>();

        if(authenticatedUser.isPresent()) {
            usersSet.add(authenticatedUser.get());
        }

        Server server = new Server();
        server.setName(serverBody.getName());
        server.setDescription(serverBody.getDescription());

        server.setUsers(usersSet);

        Server savedServer = serverRepository.save(server);

        return ResponseEntity.ok(savedServer.getUid().toString());
    }

    @GetMapping("/{uid}")
    public Server getServer(@PathVariable long uid) {
        return serverRepository.findById(uid).orElse(null);
    }

    @Transactional
    @PostMapping("/{uid}/channels")
    public ResponseEntity<?> addChannelToServer(@PathVariable long uid,
                                                @Valid @RequestBody ChannelBody channelBody) {
        if(channelRepository.existsByName(channelBody.getName())) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: A channel by this name already exists."));
        }

        Server server = serverRepository.getReferenceById(uid);

        Channel channel = new Channel();
        channel.setName(channelBody.getName());
        channel.setDescription(channelBody.getDescription());

        server.getChannels().add(channel);

        Channel savedChannel = channelRepository.save(channel);

        return ResponseEntity.ok(savedChannel.getUid().toString());
    }
}

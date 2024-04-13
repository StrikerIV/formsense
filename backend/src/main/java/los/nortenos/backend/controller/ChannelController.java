package los.nortenos.backend.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import los.nortenos.backend.dto.database.Channel;
import los.nortenos.backend.dto.database.Server;
import los.nortenos.backend.dto.payload.request.ChannelBody;
import los.nortenos.backend.dto.payload.response.Message;
import los.nortenos.backend.repository.ChannelRepository;
import los.nortenos.backend.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/servers/{server_uid}/channels")
public class ChannelController {

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ServerRepository serverRepository;

    @GetMapping("")
    public ResponseEntity<?> getChannels(@PathVariable final long server_uid) {
        Optional<Server> queriedServer = serverRepository.findById(server_uid);

        if(!queriedServer.isPresent()) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: No server was found by that id."));
        }

        Server server = queriedServer.get();
        return ResponseEntity.ok(server.getChannels());
    }

    @PostMapping("")
    public ResponseEntity<?> addChannelToServer(@PathVariable long server_uid,
                                                @Valid @RequestBody ChannelBody channelBody) {
        if(channelRepository.existsByName(channelBody.getName())) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: A channel by this name already exists."));
        }

        Server server = serverRepository.getReferenceById(server_uid);

        Channel channel = new Channel();
        channel.setName(channelBody.getName());
        channel.setDescription(channelBody.getDescription());

        server.getChannels().add(channel);

        Channel savedChannel = channelRepository.save(channel);

        return ResponseEntity.ok(savedChannel.getUid().toString());
    }
}

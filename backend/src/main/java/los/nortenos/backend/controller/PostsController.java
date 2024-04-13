package los.nortenos.backend.controller;

import los.nortenos.backend.dto.database.Channel;
import los.nortenos.backend.dto.database.Post;
import los.nortenos.backend.dto.database.Server;
import los.nortenos.backend.dto.payload.request.PostBody;
import los.nortenos.backend.dto.payload.response.Message;
import los.nortenos.backend.repository.ChannelRepository;
import los.nortenos.backend.repository.PostRepository;
import los.nortenos.backend.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/api/servers/{server_uid}/channels/{channel_uid}/posts")
public class PostsController {

    @Autowired
    ServerRepository serverRepository;

    @Autowired
    ChannelRepository channelRepository;

    @Autowired
    PostRepository postRepository;

    @GetMapping("")
    public ResponseEntity<?>  getPosts(
            @PathVariable final long server_uid,
            @PathVariable final long channel_uid) {

        Optional<Server> queriedServer = serverRepository.findById(server_uid);
        if(!queriedServer.isPresent()) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: No server was found by that id."));
        }

        Optional<Channel> queriedChannel = channelRepository.findById(channel_uid);
        if(!queriedChannel.isPresent()) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: No channel was found by that id."));
        }

        Channel channel = queriedChannel.get();

        return ResponseEntity.ok(channel.getPosts());
    }

    @PostMapping("")
    public ResponseEntity<?>  createPost(
            @PathVariable final long server_uid,
            @PathVariable final long channel_uid,
            @RequestBody PostBody postBody) {

        Optional<Server> queriedServer = serverRepository.findById(server_uid);
        if(!queriedServer.isPresent()) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: No server was found by that id."));
        }

        Optional<Channel> queriedChannel = channelRepository.findById(channel_uid);
        if(!queriedChannel.isPresent()) {
            return ResponseEntity.badRequest().body(new
                    Message("Error: No channel was found by that id."));
        }

        Channel channel = queriedChannel.get();

        Post post = new Post();
        post.setTitle(postBody.getTitle());
        post.setDescription(postBody.getDescription());

        channel.getPosts().add(post);

        Post savedPost = postRepository.save(post);

        return ResponseEntity.ok(savedPost);
    }
}

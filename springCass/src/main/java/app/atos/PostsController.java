package app.atos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostsController {

    @Autowired
    PostsRepository postsRepository;

    @RequestMapping("/enterEntry")
    public String home(@RequestParam(value="value") String name) {
        sendMessage(name);
        return "Neuer Eintrag " +name+ " wurde gespeichert.";
    }

    @RequestMapping("/searchEntries")
    public String getEntries(@RequestParam(value="entry") String e) {
        List<Posts> foundPosts = postsRepository.findByEntry(e);
        return ""+foundPosts.size();
    }

    public void addEntry(String value) {
        postsRepository.save(new Posts(value));
        System.out.println("Saved Post " + value +  " in the database");
    }

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String msg) {
        kafkaTemplate.send("Test", msg);
    }

    @KafkaListener(topics = "Test", groupId = "foo")
    public void listen(String message) {
        System.out.println("Received Messasge in group foo: " + message);
        addEntry(message);
    }

}

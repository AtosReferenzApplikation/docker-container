package hello;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
public class FeedbackController {

    @Autowired
    FeedbackRepository feedbackRepository;

    @RequestMapping(value = "/spring/submitFB", consumes = "application/json" ,method = RequestMethod.POST)
    public Feedback addFeedback(@RequestBody Feedback feedback){
        sendFeedback(feedback);
        return feedback;
    }

    //Kafka Producer
    @Autowired
    private KafkaTemplate<String, Feedback> kafkaTemplateFB;

    public void sendFeedback(Feedback feedback){
        // System.out.println("sending data=" + fb);
        kafkaTemplateFB.send("fb", feedback);
    }

    // Kafka Listener / Consumer
    @KafkaListener(topics = "fb", groupId = "foo")
    public void listenFB(Feedback feedback) {
        //System.out.println(feedback);
        inputFeedback(feedback);
        // feedbackRepository.save(new Feedback(3, "TestTestTestTest"));
    }

    public void inputFeedback(Feedback feedback) {
        feedbackRepository.save(feedback);
    }






}

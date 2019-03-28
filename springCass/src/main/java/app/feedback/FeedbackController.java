package app.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class FeedbackController {

    @Autowired
    FeedbackRepository feedbackRepository;

    //Just for testing
    @RequestMapping(value = "/test")
    public String test(){
        return "Test";
    }

    @RequestMapping(value = "/submitFB", consumes = "application/json" ,method = RequestMethod.POST)
    public Feedback addFeedback(@RequestBody Feedback feedback){
        sendFeedback(feedback);
        return feedback;
    }

    //Kafka Producer
    @Autowired
    private KafkaTemplate<String, Feedback> kafkaTemplateFB;

    public void sendFeedback(Feedback feedback){
        kafkaTemplateFB.send("fb", feedback);
    }

    // Kafka Listener / Consumer
    @KafkaListener(topics = "fb", groupId = "foo")
    public void listenFB(Feedback feedback) {
        inputFeedback(feedback);
    }

    public void inputFeedback(Feedback feedback) {
        feedbackRepository.save(feedback);
    }






}

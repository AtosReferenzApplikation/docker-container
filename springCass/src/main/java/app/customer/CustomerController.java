package app.customer;

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
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @RequestMapping(value = "/addCustomer", consumes = "application/json" ,method = RequestMethod.POST)
    public Customer addCustomer(@RequestBody Customer customer){
        sendCustomer(customer);
        return customer;
    }

    //Kafka Producer
    @Autowired
    private KafkaTemplate<String, Customer> kafkaTemplateCustomer;

    public void sendCustomer(Customer customer){
        kafkaTemplateCustomer.send("custom", customer);
    }

    // Kafka Listener / Consumer
    @KafkaListener(topics = "custom", groupId = "foo")
    public void listenCustomer(Customer customer) {
        inputCustomer(customer);
    }

    public void inputCustomer(Customer customer) {
        customerRepository.save(customer);
    }






}

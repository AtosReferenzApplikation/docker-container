package app.customer;

//import java.util.*;
import java.util.List;
import java.util.Arrays;
import com.google.common.collect.Lists;

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

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/addCustomer", consumes = "application/json" ,method = RequestMethod.POST)
    public Customer addCustomer(@RequestBody Customer customer){
        //sendCustomer(customer);
        customerRepository.save(customer); // kafka endlos schleife umgehen und direkt hier den save
        return customer;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getCustomers")
    public String getCustomers() {
      List<Customer> customerList = Lists.newArrayList(customerRepository.findAll());
      return customerList.toString();
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

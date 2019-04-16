package app.customer;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Lists;


@RestController
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    // @CrossOrigin(origins = "http://192.168.99.100") // Allow CORS requests
    @RequestMapping(value = "/addCustomer", consumes = "application/json" ,method = RequestMethod.POST)
    public Customer addCustomer(@RequestBody Customer customer){
        //sendCustomer(customer);
    	customerRepository.save(customer); // kafka endlos schleife umgehen
    	return customer;
    }

    // @CrossOrigin(origins = "http://192.168.99.100")
    @GetMapping("/getCustomers")
    public @ResponseBody List<Customer> getCustomers() {
    	List<Customer> customerList = Lists.newArrayList(customerRepository.findAll());
      	return customerList;
    }

    // @CrossOrigin(origins = "http://192.168.99.100")
    @RequestMapping(value = "/deleteCustomer/{id}", method = RequestMethod.DELETE)
    public void deleteCustomer(@PathVariable("id") String itemId){
    	customerRepository.deleteById(UUID.fromString(itemId));
    }

    // @CrossOrigin(origins = "http://192.168.99.100")
    @PutMapping("/updateCustomer/{id}")
    public void saveResource(@RequestBody Customer customer,
      @PathVariable("id") String id) {;
    	Customer customerInDB = customerRepository.findById(UUID.fromString(id)).get();
    	customerInDB = customer;
    	customerRepository.save(customerInDB);
    }

    // Kafka Producer
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

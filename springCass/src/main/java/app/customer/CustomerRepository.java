package app.customer;

import java.util.List;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import app.customer.Customer;

public interface CustomerRepository extends CrudRepository<Customer, String> {


}

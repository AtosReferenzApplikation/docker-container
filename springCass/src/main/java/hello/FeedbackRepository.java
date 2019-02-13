package hello;

import java.util.List;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import hello.Feedback;

public interface FeedbackRepository extends CrudRepository<Feedback, String> {


}

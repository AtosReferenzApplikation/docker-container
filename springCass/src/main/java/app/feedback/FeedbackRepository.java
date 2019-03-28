package app.feedback;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface FeedbackRepository extends CrudRepository<Feedback, UUID> {


}

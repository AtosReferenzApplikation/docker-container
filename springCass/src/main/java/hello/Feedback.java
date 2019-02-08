package hello;

import com.datastax.driver.core.utils.UUIDs;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

public class Feedback {

    private UUID id;
    private int myRatingControl;
    private String reFeedbackText;

    public Feedback(int myRatingControl, String reFeedbackText){
        this.id = UUIDs.timeBased();
        this.myRatingControl = myRatingControl;
        this.reFeedbackText = reFeedbackText;
    }

    public UUID getID(){
        return this.id;
    }
    public int getRating(){
        return this.myRatingControl;
    }
    public String getText(){
        return this.reFeedbackText;
    }

    public void setID(){
        this.id = UUIDs.timeBased();
    }
    public void setRating(int myRatingControl){
        this.myRatingControl = myRatingControl;
    }
    public void setText(String reFeedbackText){
        this.reFeedbackText = reFeedbackText;
    }
}

package hello;

import com.datastax.driver.core.utils.UUIDs;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table
public class Feedback {

    @PrimaryKey
    private UUID id;
    private String reFeedbackText;
    private int myRatingControl;

    public Feedback(){this.id = UUIDs.timeBased();}

    public Feedback(int myRatingControl, String reFeedbackText){
        this.id = UUIDs.timeBased();
        this.reFeedbackText = reFeedbackText;
        this.myRatingControl = myRatingControl;
    }

    public UUID getId(){return this.id;}
    public String getReFeedbackText(){
        return this.reFeedbackText;
    }
    public int getMyRatingControl(){
        return this.myRatingControl;
    }

    public void setId(){this.id = UUIDs.timeBased();}
    public void setMyRatingControl(int myRatingControl){
        this.myRatingControl = myRatingControl;
    }
    public void setReFeedbackText(String reFeedbackText){
        this.reFeedbackText = reFeedbackText;
    }

    @Override
    public String toString(){
        return String.format("{'id': %d, 'myRatingControl': %d, 'reFeedbackText': %s}", this.id, this.myRatingControl, this.reFeedbackText);
    }

}

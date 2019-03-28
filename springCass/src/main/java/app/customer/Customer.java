package app.customer;

import com.datastax.driver.core.utils.UUIDs;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table
public class Customer {

    @PrimaryKey
    private UUID id;
    private String name;
    private String surname;
    private String email;

    public Customer(){this.id = UUIDs.timeBased();}

    public Customer(String name, String surname, String email){
        this.id = UUIDs.timeBased();
        this.name = name;
        this.surname = surname;
        this.email = email;
    }	

	public UUID getId(){return this.id;}
    public String getName(){
        return this.name;
    }
    public String getSurname(){
        return this.surname;
    }
    /**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

    public void setId(){this.id = UUIDs.timeBased();}
    public void setName(String name){
        this.name = name;
    }
    public void setSurname(String surname){
        this.surname = surname;
    }
    /**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

    @Override
    public String toString(){
        return String.format("{'id': %s, 'name': %s, 'surname': %s, 'email': %s}", this.id, this.name, this.surname, this.email);
    }

}

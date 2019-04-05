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
    private String phone;

    public Customer(){this.id = UUIDs.timeBased();}

    public Customer(String name, String surname, String email, String phone){
        this.id = UUIDs.timeBased();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
    }	

	public UUID getId(){return this.id;}
    public String getName(){
        return this.name;
    }
    public String getSurname(){
        return this.surname;
    }
	public String getEmail() {
		return email;
	}
	public String getPhone() {
		return phone;
	}

    public void setId(){this.id = UUIDs.timeBased();}
    public void setName(String name){
        this.name = name;
    }
    public void setSurname(String surname){
        this.surname = surname;
    }
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

    @Override
    public String toString(){
        return String.format("{'id': %s, 'name': %s, 'surname': %s, 'email': %s, 'phone': %s}", this.id, this.name, this.surname, this.email, this.phone);
    }

}

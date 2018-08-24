package hello;

import com.datastax.driver.core.utils.UUIDs;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table
public class Posts {
	
	@PrimaryKey
	private UUID id;
	private String entry;
	
	public Posts(){}
	
	public Posts(String entry){
		this.id = UUIDs.timeBased();
		this.entry = entry;
	}
	
	public void setId(UUID id){
		this.id = id;
	}
	
	public UUID getId(){
		return this.id;
	}
	
	public void setEntry(String entry){
		this.entry = entry;
	}
	
	public String getEntry(){
		return this.entry;
	}
	
	@Override
	public String toString() {
		return String.format("Entry[id=%d, entry='%s']", this.id, this.entry);
	}
}
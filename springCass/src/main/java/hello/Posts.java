package hello;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
public class Posts {
	
	@PrimaryKey
	private int id;
	private String entry;
	
	public Posts(){}
	
	public Posts(int id, String entry){
		this.id = id;
		this.entry = entry;
	}
	
	public void setId(int id){
		this.id = id;
	}
	
	public int getId(){
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
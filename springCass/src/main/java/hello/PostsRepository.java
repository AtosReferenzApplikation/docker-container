package hello;

import java.util.List;

import org.springframework.data.cassandra.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import hello.Posts;

public interface PostsRepository extends CrudRepository<Posts, String> {

	@Query("SELECT max(id) FROM posts")
	public int findHighestPostId();

	@Query("SELECT * FROM posts WHERE entry= :val ALLOW FILTERING")
	public List<Posts> findByEntry(@Param("val") String val);

}
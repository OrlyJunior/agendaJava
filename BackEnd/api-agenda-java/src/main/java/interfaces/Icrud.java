package interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface Icrud {
	@GetMapping
	public ResponseEntity<?> get();
	
	@PostMapping
	public ResponseEntity<?> post(String user, String email, String password);
	
	@PutMapping()
	public ResponseEntity<?> put(String user, String email, String password, int id);
	
	@DeleteMapping
	public ResponseEntity<?> delete(int id);
	
	@GetMapping
	public ResponseEntity<?> getId(int id);
}

package interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

public interface Icrud {
	@GetMapping
	public ResponseEntity<?> get();
	
	@DeleteMapping
	public ResponseEntity<?> delete(int id);
}

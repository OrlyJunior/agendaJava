package controllers;

import models.User;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;

import javax.sql.DataSource;

import metodosUteis.Metodos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mysql.cj.xdevapi.Statement;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import interfaces.Icrud;
import jwtActions.GeraToken;

@RestController
@Api(tags = "CRUD de usuários")
public class usersController implements Icrud{
	
	@Autowired
	GeraToken geradorDeTokens;
	
	@Autowired
	Metodos metodos;
	
	@Autowired
	DataSource dataSource;
	
	@GetMapping("/users")
	@ApiOperation(value = "Retorna todos os usuários")
	public ResponseEntity<?> get() {
		ArrayList<User> usuarios = new ArrayList<User>();

		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_usuarios";

			PreparedStatement comando = con.prepareStatement(cm);

			ResultSet result = comando.executeQuery();

			while (result.next()) {
				User user = new User();

				user.setId(result.getInt("id"));
				user.setUser(result.getString("user"));
				user.setEmail(result.getString("email"));
				user.setPassword(result.getString("password"));
				user.setAtivo(result.getBoolean("ativo"));

				if (user.isAtivo() == true) {
					usuarios.add(user);
				}
			}

			return ResponseEntity.ok(usuarios);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}
	
	@GetMapping("/users/id")
	@ApiOperation(value = "Retorna um usuário pelo seu ID")
	public ResponseEntity<?> getId(@RequestBody int id){
		Connection con = null;

		User user = new User();
	
		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_usuarios where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);
			
			comando.setInt(1, id);

			ResultSet result = comando.executeQuery();

			if (result.next()) {

				user.setId(result.getInt("id"));
				user.setUser(result.getString("user"));
				user.setEmail(result.getString("email"));
				user.setPassword(result.getString("password"));
				user.setAtivo(result.getBoolean("ativo"));
			}
			
			if(user.isAtivo() == true) {
				return ResponseEntity.ok(user);
			}else {
				return ResponseEntity.ok("Este usuário está desativado!");
			}
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@PostMapping("/users/login")
	@ApiOperation(value = "Faz o login do usuário e retorna um token com seu nome, email e se está ativo ou não.")
	public ResponseEntity<?> post(@RequestBody Map<String, String> data) {
		String email = data.get("email");
		String password = data.get("password");
		
		Connection con = null;
		
		String token = "";

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_usuarios";

			PreparedStatement comando = con.prepareStatement(cm);

			ResultSet retorno = comando.executeQuery();
			
			while(retorno.next()) {
				if(email.equals(retorno.getString("email")) && password.equals(retorno.getString("password")) && retorno.getBoolean("ativo") == true) {
					token = geradorDeTokens.geraToken(retorno.getString("user"), email, retorno.getBoolean("ativo"), retorno.getInt("id"));
				
					return ResponseEntity.ok(token);
				}
			}
			
			return ResponseEntity.ok("Usuário não encontrado!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}
	
	@PostMapping("/users")
	@ApiOperation(value = "Insere um usuário na tabela")
	public ResponseEntity<?> post(@RequestBody User user) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "insert into tb_usuarios(user, email, password, ativo)values(?, ?, ?, ?)";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setString(1, user.getUser());
			comando.setString(2, user.getEmail());
			comando.setString(3, user.getPassword());
			comando.setBoolean(4, true);

			comando.execute();

			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}
	
	@PutMapping("/users")
	@ApiOperation(value = "Edita um usuário da tabela")
	public ResponseEntity<?> put(@RequestBody User user) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "update tb_usuarios set user = ?, email = ?, password = ? where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setString(1, user.getUser());
			comando.setString(2, user.getEmail());
			comando.setString(3, user.getPassword());
			comando.setInt(4, user.getId());

			comando.execute();

			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@DeleteMapping("/users")
	@ApiOperation(value = "Desativa um usuário na tabela")
	public ResponseEntity<?> delete(int id) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "update tb_usuarios set ativo = false where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);
			
			comando.setInt(1, id);
			
			comando.execute();
			
			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("erro", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}
}
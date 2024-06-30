package controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import models.Agenda;
import metodosUteis.Metodos;
import interfaces.Icrud;

@RestController
@Api(tags = "CRUD de agendas")
public class agendasController implements Icrud {
	@Autowired
	Metodos metodos;
	
	@Autowired
	DataSource dataSource;
	
	@GetMapping("/agendas")
	@ApiOperation(value = "Retorna todas as agendas da tabela")
	public ResponseEntity<?> get() {
		ArrayList<Agenda> agendas = new ArrayList<>();
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_agendas";

			PreparedStatement comando = con.prepareStatement(cm);

			ResultSet retorno = comando.executeQuery();

			while (retorno.next()) {
				Agenda agenda = new Agenda();

				agenda.setId(retorno.getInt("id"));
				agenda.setUsuarioId(retorno.getInt("usuarioId"));
				agenda.setNome(retorno.getString("nome"));
				agenda.setAtivo(retorno.getBoolean("ativo"));

				if (agenda.isAtivo() == true) {
					agendas.add(agenda);
				}
			}

			return ResponseEntity.ok(agendas);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@GetMapping("/agendas/usuarioId")
	@ApiOperation(value = "Retorna todas as agendas da tabela")
	public ResponseEntity<?> getPorUsuarioId(int usuarioId) {
		ArrayList<Agenda> agendas = new ArrayList<>();
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_agendas where usuarioId = ?";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setInt(1, usuarioId);

			ResultSet retorno = comando.executeQuery();

			while (retorno.next()) {
				Agenda agenda = new Agenda();

				agenda.setId(retorno.getInt("id"));
				agenda.setUsuarioId(retorno.getInt("usuarioId"));
				agenda.setNome(retorno.getString("nome"));
				agenda.setAtivo(retorno.getBoolean("ativo"));

				if (agenda.isAtivo() == true) {
					agendas.add(agenda);
				}
			}

			return ResponseEntity.ok(agendas);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@GetMapping("/agendas/id")
	@ApiOperation(value = "Retorna uma agenda pelo seu ID")
	public ResponseEntity<?> getAgendaId(int id) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "select * from tb_agendas where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setInt(1, id);

			ResultSet retorno = comando.executeQuery();

			Agenda agenda = new Agenda();

			while (retorno.next()) {
				agenda.setId(retorno.getInt("id"));
				agenda.setNome(retorno.getString("nome"));
				agenda.setUsuarioId(retorno.getInt("usuarioId"));
				agenda.setAtivo(retorno.getBoolean("ativo"));
			}

			if (agenda.isAtivo()) {
				return ResponseEntity.ok(agenda);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Collections.singletonMap("error", "Esta agenda não está ativa ou não existe!"));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@PostMapping("/agendas")
	@ApiOperation(value = "Insere uma agenda na tabela")
	public ResponseEntity<?> post(@RequestBody Agenda agenda) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "insert into tb_agendas (usuarioId, nome, ativo) values (?, ?, ?)";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setInt(1, agenda.getUsuarioId());
			comando.setString(2, agenda.getNome());
			comando.setBoolean(3, true);

			comando.execute();

			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@PutMapping("/agendas")
	@ApiOperation(value = "Edita uma agenda da tabela")
	public ResponseEntity<?> put(@RequestBody Agenda agenda) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "update tb_agendas set nome = ? where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setString(1, agenda.getNome());
			comando.setInt(2, agenda.getId());

			comando.execute();

			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}

	@DeleteMapping("/agendas")
	@ApiOperation(value = "Desativa uma agenda da tabela")
	public ResponseEntity<?> delete(int id) {
		Connection con = null;

		try {
			con = DataSourceUtils.getConnection(dataSource);

			String cm = "update tb_agendas set ativo = ? where id = ?";

			PreparedStatement comando = con.prepareStatement(cm);

			comando.setBoolean(1, false);
			comando.setInt(2, id);

			comando.execute();
			
			comando.close();
			
			String cm2 = "update tb_compromissos set ativo = ? where agendaId = ?";
			
			PreparedStatement comando2 = con.prepareStatement(cm2);
			
			comando2.setBoolean(1, false);
			comando2.setInt(2, id);
			
			comando2.execute();
			
			comando2.close();
			return ResponseEntity.ok("Sucesso!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", e.getMessage()));
		} finally {
			metodos.fecharConexao(con);
		}
	}
}
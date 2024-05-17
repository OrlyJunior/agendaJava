package controllers;

import models.Compromisso;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Collections;
import metodosUteis.Metodos;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import interfaces.Icrud;

@RestController
@Api(tags = "CRUD de compromissos")
public class compromissosController implements Icrud {
    Metodos metodos = new Metodos();

    private final String connectionString = "jdbc:mysql://localhost:3306/agenda_java?user=root&password=1234561";

    @GetMapping("/compromissos")
    @ApiOperation(value = "Retorna todos os compromissos da tabela")
    public ResponseEntity<?> get() {
        ArrayList<Compromisso> compromissos = new ArrayList<>();

        Connection con = null;
        try {
            con = DriverManager.getConnection(connectionString);

            String cm = "select * from tb_compromissos";

            PreparedStatement comando = con.prepareStatement(cm);

            ResultSet retorno = comando.executeQuery();

            while (retorno.next()) {
                Compromisso compromisso = new Compromisso();

                compromisso.setId(retorno.getInt("id"));
                compromisso.setDescricao(retorno.getString("descricao"));
                compromisso.setData(retorno.getString("data_hora"));
                compromisso.setCidade(retorno.getString("cidade"));
                compromisso.setBairro(retorno.getString("bairro"));
                compromisso.setRua(retorno.getString("rua"));
                compromisso.setNumero(retorno.getInt("numero"));
                compromisso.setAgendaId(retorno.getInt("agendaId"));
                compromisso.setUsuarioId(retorno.getInt("usuarioId"));
                compromisso.setAtivo(retorno.getBoolean("ativo"));

                if (compromisso.isAtivo()) {
                    compromissos.add(compromisso);
                }
            }

            return ResponseEntity.ok(compromissos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        } finally {
            metodos.fecharConexao(con);
        }
    }

    @PostMapping("/compromissos")
    @ApiOperation(value = "Insere um compromisso na tabela")
    public ResponseEntity<?> post(@RequestBody Compromisso compromisso) {
        Connection con = null;

        try {
            con = DriverManager.getConnection(connectionString);

            String cm = "insert into tb_compromissos(descricao, data_hora, cidade, bairro, rua, numero, usuarioId, agendaId, ativo)values(?, ?, ?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement comando = con.prepareStatement(cm);

            comando.setString(1, compromisso.getDescricao());
            comando.setString(2, compromisso.getData());
            comando.setString(3, compromisso.getCidade());
            comando.setString(4, compromisso.getBairro());
            comando.setString(5, compromisso.getRua());
            comando.setInt(6, compromisso.getNumero());
            comando.setInt(7, compromisso.getUsuarioId());
            comando.setInt(8, compromisso.getAgendaId());
            comando.setBoolean(9, true);

            comando.execute();

            return ResponseEntity.ok("Sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("erro", e.getMessage()));
        } finally {
            metodos.fecharConexao(con);
        }
    }

    @PutMapping("/compromissos")
    @ApiOperation(value = "Edita um compromisso da tabela")
    public ResponseEntity<?> put(@RequestBody Compromisso compromisso) {
        Connection con = null;

        try {
            con = DriverManager.getConnection(connectionString);

            String cm = "update tb_compromissos set descricao = ?, data_hora = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, usuarioId = ?, agendaId = ? where id = ?";

            PreparedStatement comando = con.prepareStatement(cm);

            comando.setString(1, compromisso.getDescricao());
            comando.setString(2, compromisso.getData());
            comando.setString(3, compromisso.getCidade());
            comando.setString(4, compromisso.getBairro());
            comando.setString(5, compromisso.getRua());
            comando.setInt(6, compromisso.getNumero());
            comando.setInt(7, compromisso.getUsuarioId());
            comando.setInt(8, compromisso.getAgendaId());
            comando.setInt(9, compromisso.getId());

            comando.execute();

            return ResponseEntity.ok("Sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("erro", e.getMessage()));
        } finally {
            metodos.fecharConexao(con);
        }
    }

    @DeleteMapping("/compromissos")
    @ApiOperation(value = "Desativa um compromisso da tabela")
    public ResponseEntity<?> delete(@RequestParam int id) {
        Connection con = null;

        try {
            con = DriverManager.getConnection(connectionString);

            String cm = "update tb_compromissos set ativo = ? where id = ?";

            PreparedStatement comando = con.prepareStatement(cm);

            comando.setBoolean(1, false);
            comando.setInt(2, id);

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

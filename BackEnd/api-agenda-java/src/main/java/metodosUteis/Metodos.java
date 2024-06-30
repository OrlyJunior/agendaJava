package metodosUteis;

import java.sql.Connection;

import org.springframework.stereotype.Component;

@Component
public class Metodos {
	public void fecharConexao(Connection con) {
		try {
			con.close();
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
}

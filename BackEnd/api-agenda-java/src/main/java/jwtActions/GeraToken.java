package jwtActions;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

public class GeraToken {
	public String geraToken(String user, String email, boolean ativo, int id) {
		Date expira = new Date(System.currentTimeMillis() + 3600000);
		
		String chaveSecreta = palavraSecreta();
		
		try {
			Map<String, Object> claims = new HashMap<>();
			
            claims.put("user", user);
            claims.put("email", email);
            claims.put("ativo", ativo);
            claims.put("id", id);
			
			String token = Jwts.builder()
								.claim("dados", claims)
								.setExpiration(expira)
								.signWith(SignatureAlgorithm.HS256, chaveSecreta)
								.compact();
			
			return token;
		}catch(Exception e) {
			return e.getMessage();
		}
	}
	
	protected String palavraSecreta() {
		String caracteresAceitos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
		SecureRandom aleatorizar = new SecureRandom();
		
		StringBuilder construtor = new StringBuilder();
		
		for(int i = 0; i < 256; i++) {
			int indexAleatorio = aleatorizar.nextInt(caracteresAceitos.length());
			
			construtor.append(caracteresAceitos.charAt(indexAleatorio));
		}
		
		return construtor.toString();
	}
}

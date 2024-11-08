package com.web.spring.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.web.spring.entity.Member;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureAlgorithm;

@Component
public class JwtGenerator {



    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        return header;
    }
	/*
	 * private Map<String, Object> createClaims(Member member) { Map<String, Object>
	 * claims = new HashMap<>(); claims.put("Identifier", member.getIdentifier());
	 * claims.put("Role", member.getRole()); return claims; }
	 */
}
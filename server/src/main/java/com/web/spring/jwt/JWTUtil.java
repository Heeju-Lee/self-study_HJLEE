package com.web.spring.jwt;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import com.web.spring.entity.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

/*
 JWT 정보 검증및 생성
 */
@Component
@Slf4j
public class JWTUtil {


    private SecretKey secretKey;//Decode한 secret key를 담는 객체
	
    @Value("${jwt.security.key}")
    private String secretKeyString; 
    
	 @Value("${jwt.response.header}")
	 public String jwtHeader;
	 
	 
	 @Value("${jwt.token.prefix}")
	 public String jwtTokenPrefix;
	 
	 @Value("${jwt.algorithm}")
	 private String algorithm;
	 
	    private long accessTokenValidTime = Duration.ofMinutes(30).toMillis(); // 만료시간 30분
	    private long refreshTokenValidTime = Duration.ofDays(14).toMillis(); // 만료시간 2주

	    @Autowired
	    private UserDetailsService userDetailsService;

	    @PostConstruct
	    public void init() {
	        secretKey = new SecretKeySpec(secretKeyString.getBytes(), getAlgorithm(algorithm));
	    }
	    
	    // 선택된 알고리즘 반환 메서드
	    private SignatureAlgorithm getAlgorithm(String algorithm) {
	        switch (algorithm) {
	            case "HS256": return SignatureAlgorithm.HS256;
	            case "HS384": return SignatureAlgorithm.HS384;
	            case "HS512": return SignatureAlgorithm.HS512;
	            // 필요한 다른 알고리즘 추가 가능
	            default: throw new IllegalArgumentException("지원하지 않는 알고리즘입니다: " + algorithm);
	        }
	    }
	    
    //검증 name
    public String getId(String token) {
         log.info("getUsername(String token)  call");
       String re = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
        log.info("getUsername(String token)  re = {}" ,re);
        return re;
    }
    //검증 Id
    public String getname(String token) {
        log.info("getId(String token)  call");
        String re = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
        log.info("getIds(String token)  re = {}" ,re);
        return re;
    }
    
    //검증 Role
    public String getRole(String token) {
        log.info("getRole(String token)  call");
        String re = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
        log.info("getRole(String token)  re = {} " , re);
        return re;
    }
    
    //이런것을 클레임이라고 함.
    //MemberNo를 검증
    public Long getMemberNo(String token) {
        log.info("getRole(String token)  call");
        Long re = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("memberNo", Long.class);
        log.info("getRole(String token)  re = {} " , re);
        return re;
    }
    
    //검증 Expired
    public Boolean isExpired(String token) {
        log.info("isExpired(String token)  call");
        boolean re = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
        log.info("isExpired(String token)  re  = {}",re);
        return re;
    }
    
    //토큰 생성
    //Bearer : JWT 혹은 Oauth에 대한 토큰을 사용
    //public String createJwt(String username, String role, Long expiredMs) {
    //claim은 payload에 해당하는 정보
    public String createJwt(Member member, String role) {
        log.info("createJwt Access  call");
      
        return Jwts.builder()
                .claim("username", member.getName()) //이름
                .claim("id", member.getId()) //아이디
                .claim("role", role) //Role
                .claim("memberNo", member.getMemberNum())//유저 이름
                .issuedAt(new Date(System.currentTimeMillis())) //현재로그인된 시간
                .expiration(new Date(System.currentTimeMillis() + accessTokenValidTime)) //만료시간
                .signWith(secretKey) // 서명과 함께 저장됨
                .compact();
    }
    
    public String createRefreshJwt(Member member, String role) {
    	log.info("create refresh JWT call");
    	
    	  return Jwts.builder()
                  .claim("username", member.getName()) //이름
                  .claim("id", member.getId()) //아이디
                  .claim("role", role) //Role
                  .claim("memberNo", member.getMemberNum())
                  .issuedAt(new Date(System.currentTimeMillis())) //현재로그인된 시간
                  .expiration(new Date(System.currentTimeMillis() + refreshTokenValidTime)) //만료시간
                  .signWith(secretKey) // 서명과 함께 저장됨
                  .compact();
    	
    }
}




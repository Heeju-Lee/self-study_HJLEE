package com.web.spring.jwt;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.web.spring.entity.Member;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;

import com.google.gson.Gson;
import com.web.spring.security.CustomMemberDetails;


import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter{ //폼값 받는 컨트롤러 역할의 필터
	private final AuthenticationManager authenticationManager;
	
	private final JWTUtil jwtUtil;
	
	private final RefreshTokenRepository refreshTokenRepository;

	public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,RefreshTokenRepository refreshTokenRepository) {		
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
		this.refreshTokenRepository = refreshTokenRepository;
		 log.info("LoginFilter initialized with AuthenticationManager and JWTUtil and refreshTokenRepository");
	}
	
	
	
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
													throws AuthenticationException{

		//1. 클라이언트 로그인 요청시 id, password 받아서 출력
		   String username = null;
	        String password = null;

	        try {
	            // 요청 본문을 JSON 형식으로 파싱하여 username과 password를 가져옴
	            String requestBody = StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8);
	            Map<String, String> requestMap = new Gson().fromJson(requestBody, Map.class);
	            username = requestMap.get("username");
	            password = requestMap.get("password");
	        } catch (IOException e) {
	            log.error("Failed to parse request body", e);
	        }
		log.info("username : {}",username);
		log.info("password : {}",password);
		
		//2. 스프링 시큐러티에서는 username, password를 검증하기 위해서 ~~token에 담는다.
		//지금은 authorization은 없어서  null 로 담았다.
		UsernamePasswordAuthenticationToken authToken = 
				new UsernamePasswordAuthenticationToken(username, password,null); //id, password, author
		
		//3. token을 ~Manager에 전달...Provoder...DetailsServicve...db연결...CustomMemberDetails생성..Back/Back/...
		Authentication authentication=authenticationManager.authenticate(authToken);//CustomMemberDetails정보를 반환...
		log.info("authentication{}",authentication);
		return authentication;
	}//
	
//	 @Override
//	    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//	        log.info("로그인");
//	        try {
//	            User user = objectMapper.readValue(request.getInputStream(), User.class);
//
//	            UsernamePasswordAuthenticationToken authenticationToken =
//	                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
//
//	            return authenticationManager.authenticate(authenticationToken);
//	        } catch (IOException e) {
//	            log.error("{}", e);
//	        }
//	        return null;
//	    }
	
	//로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authentication) throws  IOException{
        response.setContentType("text/html;charset=UTF-8");
       log.info("로그인 성공 ......");
        //UserDetailsS 
        CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getPrincipal();
        
        //이 정보는 왜 받아왔을까? 리프레쉬 토큰에 해당값을 넣었다.
        String username = customMemberDetails.getUsername();//아이디        
        
        /*
        하나의 유저가 여러개의 권한을 가질수 있기 때문에 collection으로 반환됨
        기본 제너릭이 GrantedAuthority이고 GrantedAuthority를 상속받은 자식들이 Role 이 된다
        이렇게 해서 Role을 만들어준다...MemberServiceImpl signUp에서 Role Setting(member.setRole("ROLE_USER"))
        우리는 하나의 권한만 지정했다..ROLE_USER
        */
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority(); //ROLE_CHILD or ROLE_PARENT

        //토큰생성과정...이때 password는 JWTUtil에서 안담았다.
        String accessToken = jwtUtil.createJwt(
                customMemberDetails.getMember(), role);//1초*60*10 10분
        String refreshToken = jwtUtil.createRefreshJwt(
                customMemberDetails.getMember(), role);//1초*60*60*24 24시간(하루)
        // 토큰 로그
        log.info("Access Token 생성: {}", accessToken);
        log.info("Refresh Token 생성: {}", refreshToken);
        addRefresh(username, refreshToken, 12*60);
        System.out.println("@@@@@@@@@@@@@@@@@@ getMember "+ customMemberDetails.getMember() +" @@@@@@@@@@@@@@@@@@");
        //응답할 헤더를 설정
        //베어러 뒤에 공백을 준다. 관례적인  prefix
        response.addHeader("Authorization-Access", jwtUtil.jwtTokenPrefix + accessToken);
        response.addHeader("Authorization-Refresh", jwtUtil.jwtTokenPrefix + refreshToken);
        //아마 로그인시 데이터 확인 용 코드인듯하다. 후에 
        Map<String, Object> map = new HashMap<>();
        Member member = customMemberDetails.getMember();
        map.put("memberNo",member.getMemberNum());
        map.put("id", member.getId());
        map.put("name", member.getName());
        map.put("ROLE", member.getRole());
        
        Gson gson= new Gson();
        String arr = gson.toJson(map);
        response.getWriter().print(arr);
        
    }
    //로그인 실패시 실행하는 메소드
    //CustomMemberDetailsService에서 null이 떨어지면 이곳으로 리턴..
    //응답 메세지를 Json형태로 프론크 단으로 넘기기 위해서 Gson 라이브러리 사용함.
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException {

        response.setContentType("text/html;charset=UTF-8");

        log.info("로그인 실패... ......");
        //로그인 실패시 401 응답 코드 반환
        response.setStatus(401);

        Map<String, Object> map = new HashMap<>();
        map.put("errMsg","정보를 다시 확인해주세요.");
        Gson gson= new Gson();
        String arr = gson.toJson(map);
        response.getWriter().print(arr);
        log.error("Authentication attempt failed", failed);
    }
    
    
    protected void addRefresh(String username, String refresh, int expiredMinute){
    	Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expiredMinute);
        Date date = calendar.getTime();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUsername(username);
        refreshToken.setToken(refresh);
        refreshToken.setExpiration(date.toString());
     // 저장 전 로그
        log.info("저장할 Refresh Token 정보: Username={}, Token={}, Expiration={}", 
                 username, refresh, expiredMinute);
        refreshTokenRepository.save(refreshToken);
        // 저장 후 확인 로그
        log.info("Refresh Token 저장 완료");
    }
    
    Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(12*60*60); // 12h
        cookie.setHttpOnly(true);   //JS로 접근 불가, 탈취 위험 감소
        return cookie;
    }
	
}
 









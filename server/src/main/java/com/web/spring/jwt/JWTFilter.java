package com.web.spring.jwt;

import java.io.IOException;

import com.web.spring.entity.Member;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.web.spring.entity.Member;
import com.web.spring.security.CustomMemberDetails;
import com.web.spring.service.MemberService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
 
 JWTFilter 는  SecurityFilterChain 앞에 있는 것이라고 생각하면 된다. (모든 필터의 앞에 있다.)
  무조건 사용자 요청이 들어올때마다 이 필터를 무조건 제일 먼저 들린다.
  1)토큰 있니?
    있으면 --> 토큰이 유효한지를 체크
    없으면 --> 그냥 다음 해야할 필터 또는 Controller 를 실행
 */
public class JWTFilter extends OncePerRequestFilter {

	private final JWTUtil jwtUtil;

	private final MemberService memberService;
	public JWTFilter(JWTUtil jwtUtil,MemberService memberService) {
		this.jwtUtil = jwtUtil;
		this.memberService = memberService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// request에서 Authorization 헤더를 찾음..인증을 거쳐야하는 서비스에서는 반드시 이 부분이 헤더에 있어야 한다.
		// 헤더에서 Authorization 이름의 키값을 꺼내는 작업을 일단 먼저 한다.
		String authorization = request.getHeader(jwtUtil.jwtHeader);

		// Authorization 헤더 검증
		// 인증을 거치고 들어온 요청이 아니라면
		if (authorization == null || !authorization.startsWith(jwtUtil.jwtTokenPrefix)) { // 인증후 들어온게 아니거나 검증된 토큰이 아니라면

			System.out.println("token null");
			filterChain.doFilter(request, response);// 다음에 있는 필터로 가는 부분..갔다가 오면 아래에 있는 사후처리를 하는데..이걸 안하게 하려면 바로 return

			// 조건이 해당되면 메소드 종료 (필수)
			return;
		}

		// 토큰이 있다면..
		System.out.println("authorization now");
		// Bearer 부분 제거 후 순수 토큰만 획득
		String token = authorization.split(" ")[1];

		// 토큰 소멸 시간 검증
		if (jwtUtil.isExpired(token)) {
			String refreshToken = request.getHeader("Refresh-Token"); // 클라이언트에서 Refresh Token도 요청 헤더로 전달
			System.out.println("token expired");

			if (refreshToken == null || !memberService.isRefreshTokenValid(refreshToken)) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("토큰이 만료되었습니다. 다시 로그인해 주세요.");
				return;
			}
			// Refresh Token이 유효하다면 새로운 Access Token 발급
			String newAccessToken =memberService.refreshAccessToken(refreshToken);
			response.setHeader(jwtUtil.getJwtHeader(), jwtUtil.getJwtTokenPrefix() + newAccessToken);

			// 새로운 Access Token에서 사용자 정보 추출 후 SecurityContext에 설정
			setUpAuthentication(newAccessToken);
		} else {
			// Access Token이 유효하면 그대로 인증 설정
			setUpAuthentication(token);
		}

		

	// 만료된 토큰이 아니라면
	// 살아있는 토큰이라면 토큰에서 username과 role 획득
		 String username = jwtUtil.getId(token);// 아이디 받기
	String name = jwtUtil.getname(token);// 이름 받기
	String role = jwtUtil.getRole(token);
	Long memberNo = jwtUtil.getMemberNo(token);

	// userEntity를 생성하여 값 set
	// 스프링 컨테이너에서는 무상태를 유지하고 있기 떄문에 지금 들어온 요청이 누구인지 확인할 수 없다...member객체 생성하는 이유
	// 인증된 사용자의 정보를 계속해서 유지하려면 서버가 인증된 사용자의 정보를 알고 있어야 한다.
	// 예전에는 세션에서 꺼내썼지만 지금은 토큰에서 뽑아서 Claim에 대한 정보를 꺼내서 member객체를 생성
	Member member = new Member();member.setId(username);member.setName(name);member.setRole(role);member.setMemberNum(memberNo);

	// UserDetails에 회원 정보 객체 담기
	CustomMemberDetails customMemberDetails = new CustomMemberDetails(member);

	// 스프링 시큐리티 인증 토큰 생성
	Authentication authToken = new UsernamePasswordAuthenticationToken(customMemberDetails, null,
			customMemberDetails.getAuthorities());

	// 이걸 마지막으로 SecurityContextHolder에 저장 | 세션에 사용자 등록 - 세션이 만들어짐.
	// 이게 저장되어 있으면 이걸 Controller 혹은 Service에서 꺼내어 사용한다.
	// 직접 확인 --> Boardcontroller findAll() 가서 직접 꺼내는 부분을 확인!!
	SecurityContextHolder.getContext().setAuthentication(authToken);
	filterChain.doFilter(request, response);

	// 조건이 해당되면 메소드 종료 (필수)
	return;
	}
	
	  private void setUpAuthentication(String token) {
	        String username = jwtUtil.getId(token);
	        String role = jwtUtil.getRole(token);
	        Long memberNo = jwtUtil.getMemberNo(token);

	        Member member = new Member();
	        member.setId(username);
	        member.setRole(role);
	        member.setMemberNum(memberNo);

	        CustomMemberDetails customMemberDetails = new CustomMemberDetails(member);

	        Authentication authToken = new UsernamePasswordAuthenticationToken(customMemberDetails, null, customMemberDetails.getAuthorities());
	        SecurityContextHolder.getContext().setAuthentication(authToken);
	    }
}




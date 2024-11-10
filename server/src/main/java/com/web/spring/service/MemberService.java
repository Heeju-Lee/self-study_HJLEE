package com.web.spring.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.spring.entity.Member;
import com.web.spring.jwt.JWTUtil;
import com.web.spring.jwt.RefreshToken;
import com.web.spring.jwt.RefreshTokenRepository;
@Service
public class MemberService {

	
	@Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    // Refresh Token 유효성 검증
    public boolean isRefreshTokenValid(String refreshToken) {
        if (!jwtUtil.isTokenValid(refreshToken)) {
            return false;
        }

        String username = jwtUtil.getId(refreshToken);
        Optional<RefreshToken> storedToken = refreshTokenRepository.findByToken(refreshToken);

        return storedToken.isPresent() && storedToken.get().getUsername().equals(username);
    }

    // Refresh Token을 통해 새로운 Access Token 발급
    public String refreshAccessToken(String refreshToken) {
    	String id = jwtUtil.getId(refreshToken);
    	String name = jwtUtil.getname(refreshToken);
        String role = jwtUtil.getRole(refreshToken);
        Long memberNum = jwtUtil.getMemberNo(refreshToken);
        Member mem = new Member(id, name, role,memberNum);
        
        return jwtUtil.createJwt(mem,role);
    }
}

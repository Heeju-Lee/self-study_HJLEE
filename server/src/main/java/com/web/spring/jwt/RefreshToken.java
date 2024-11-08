package com.web.spring.jwt;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@RedisHash(value = "memberId", timeToLive = 14440)
@AllArgsConstructor
public class RefreshToken {
	//redis에 refresh토큰을 저장하기 위한 클래스 key로 memberId, value를 refreshToken
	//유효시간 timeToLive = 14440(4시간)
	
    @Id
    private Long memberId;
    
    private String refreshToken;
   

    public RefreshToken(String refreshToken, Long memberId) {
        this.refreshToken = refreshToken;
        this.memberId = memberId;
    }
}
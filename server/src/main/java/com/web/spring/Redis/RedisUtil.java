package com.web.spring.Redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	
    private final RedisTemplate<String, String> redisTemplate;

    //리프레쉬 토큰 저장
    public void saveRefreshToken(String loginId, String refreshToken) {
        redisTemplate.opsForValue().set(loginId, refreshToken);
    }
    //리프레쉬 토큰 가져오기
    public String getRefreshToken(String loginId) {
        return redisTemplate.opsForValue().get(loginId);
    }
    //리프레쉬 토큰 삭제
    public void deleteRefreshToken(String loginId) {
        redisTemplate.delete(loginId);
    }
}

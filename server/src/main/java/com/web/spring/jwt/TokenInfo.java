package com.web.spring.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfo {

    private String grantType; //JWT에 대한 인증방식(Bearer를 사용)
    private String accessToken;
    private String refreshToken;

}
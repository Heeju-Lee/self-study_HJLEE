package com.web.spring.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import 
org.springframework.web.servlet.config.annotation.CorsRegistry;
import 
org.springframework.web.servlet.config.annotation.EnableWebMvc;
import 
org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* WebMvcConfigurer 를 이용해서 @CrossOrigin 글로벌 설정
* */
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
	

    @Value("${jwt.response.header}")
    private String jwtHeader;
  @Override
  public void addCorsMappings(CorsRegistry registry) {
     registry.addMapping("/**")
     .allowedOrigins("http://localhost:3000")
     .exposedHeaders(jwtHeader) // 'Authorization' 헤더 값을 받아온다
     .allowedMethods("OPTIONS","GET","POST","PUT","DELETE")
     .allowCredentials(true);
  }
}
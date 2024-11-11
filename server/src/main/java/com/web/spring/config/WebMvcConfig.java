package com.web.spring.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import 
org.springframework.web.servlet.config.annotation.CorsRegistry;
import 
org.springframework.web.servlet.config.annotation.EnableWebMvc;
import 
org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
* WebMvcConfigurer 를 이용해서 @CrossOrigin 글로벌 설정
* */
@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
     registry.addMapping("/**")
     .allowedOriginPatterns("*") // “*“같은 와일드카드를 사용
     .allowedOrigins("http://localhost:3000")
     .allowedMethods("OPTIONS","GET","POST","PUT","DELETE");
  }
}
package com.web.spring.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Member {
	
    private Long memberNo;
  
    @Column(unique = true)
    private String id;
    private String pwd;//길이를 주면 안됨..암호화때 길어진다
    private String role; // ROLE_CHILD, ROEL_PARENT
    private String name;
    private boolean isParent;

}

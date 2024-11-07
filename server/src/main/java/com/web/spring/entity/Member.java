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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@SuperBuilder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(unique = true)
    private String id;
    private String pwd;//길이를 주면 안됨..암호화때 길어진다

    @Column(length = 20)
    private String name;
    private String address;

    private String birthdate;
    private String phone;
    private String email;

    /* 생성 시간 */
    @CreatedDate
    @Column(updatable = false)
    private LocalDate createdAt;

    /* 수정 시간 */
    @LastModifiedDate
    private LocalDate modifiedAt;

    //추가
    private String role;

    @Override
    public String toString() {
        return "Member{" +
                "memberNo=" + memberNo +
                ", id='" + id + '\'' +
                ", pwd='" + pwd + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                ", role='" + role + '\'' +
                '}';
    }
}

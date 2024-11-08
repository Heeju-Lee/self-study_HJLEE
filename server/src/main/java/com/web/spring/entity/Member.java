package com.web.spring.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;

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


	private String Id;
	private String password;//길이를 주면 안됨..암호화때 길어진다
    private String name;

    //추가
    private String role;//USER_PARENTS, USER_CHIlD
    
//    private Long childNum;
//    
//    private Long parentNum;
//
//	@Override
//	public String toString() {
//		return "Member [id=" + id + ", pwd=" + pwd + ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt
//				+ ", role=" + role + ", childNum=" + childNum + ", parentNum=" + parentNum + "]";
//	}
    
	

    /*
     * 아래 코드는 react에서 role을 가지고 구분하고서 해당 num 값을 받기 위해서 존재하는 코드 react코드를 확인 후 변경예정
     * */
    private Long memberNum;

	@Override
	public String toString() {
		return "Member [Id=" + Id + ", password=" + password + ", name=" + name + ", role=" + role
				+ ", memberNum=" + memberNum + "]";
	}
    
	


}

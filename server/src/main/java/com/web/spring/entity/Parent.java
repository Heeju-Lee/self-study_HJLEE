package com.web.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Parent {

    @Id
    @Column(name = "p_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pNum;

    private String name;
    private String birthdate;
    private String phone;
    private String email;
    private String address;
    
	@Override
	public String toString() {
		return "Parent [pNum=" + pNum + ", name=" + name + ", birthdate=" + birthdate + ", phone=" + phone + ", email="
				+ email + ", address=" + address + "]";
	}
   

}
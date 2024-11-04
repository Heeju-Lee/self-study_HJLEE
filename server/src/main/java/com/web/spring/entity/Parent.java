package com.web.spring.entity;

import java.util.ArrayList;
import java.util.List;

import com.web.spring.global.audit.Auditable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Parent extends Auditable{

    @Id
    @Column(name = "p_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pNum;

    private String name;
    private String birthdate;
    private String phone;
    private String email;
    private String address;
    
	@OneToMany(fetch = FetchType.LAZY , cascade = {CascadeType.PERSIST})
	@JoinColumn(name = "p_num", nullable = false, updatable = false) 
	private List<Child> children = new ArrayList<>();
	
	
	@OneToMany(fetch = FetchType.LAZY , cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	@JoinColumn(name = "p_num", nullable = false, updatable = false) 
	private List<PointOrder> orders = new ArrayList<>();
    
	@Override
	public String toString() {
		return "Parent [pNum=" + pNum + ", name=" + name + ", birthdate=" + birthdate + ", phone=" + phone + ", email="
				+ email + ", address=" + address + "]";
	}
   

}
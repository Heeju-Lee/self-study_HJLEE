package com.web.spring.entity;

import java.util.List;

import com.web.spring.global.audit.Auditable;

import java.time.LocalDateTime;
import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Wish extends Auditable{

    @Id
    @Column(name = "w_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wNum;

    private String img;
    private String name;
    private String price;

    @Column(name="saving_amt")
    private String savingAmt;

	@Override
	public String toString() {
		return "Wish [wNum=" + wNum + ", img=" + img + ", name=" + name + ", price=" + price + ", savingAmt="
				+ savingAmt + ", getCreatedAt()=" + getCreatedAt() + ", getModifiedAt()=" + getModifiedAt() + "]";
	}
    
    
    
//	@Override
//	public String toString() {
//		return "Wish [wNum=" + wNum + ", img=" + img + ", name=" + name + ", price=" + price + ", savingAmt="
//				+ savingAmt + "]";
//	}
//    
    
}

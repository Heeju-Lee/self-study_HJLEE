package com.web.spring.entity;

import java.util.List;
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
public class Payment {

    @Id
    @Column(name = "payment_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentNum;

    private String date;

    @Column(name = "card_num")
    private String cardNum;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "payment_amt")
    private int paymentAmt;

    private String category;
    
    /*결제 내역-아이 다대일 연관관계*/
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "c_num")
    Child child;

	@Override
	public String toString() {
		return "Payment [paymentNum=" + paymentNum + ", date=" + date + ", cardNum=" + cardNum + ", storeName="
				+ storeName + ", paymentAmt=" + paymentAmt + ", category=" + category + "]";
	}
    
    
}

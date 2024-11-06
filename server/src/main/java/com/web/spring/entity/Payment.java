package com.web.spring.entity;

import com.web.spring.global.audit.Auditable;

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

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Payment extends Auditable{

    @Id
    @Column(name = "payment_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentNum;

    @Column(name = "card_num")
    private String cardNum;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "payment_amt")
    private int paymentAmt;

    private String category;

	@Override
	public String toString() {
		return "Payment [paymentNum=" + paymentNum + ", cardNum=" + cardNum + ", storeName=" + storeName
				+ ", paymentAmt=" + paymentAmt + ", category=" + category + ", getCreatedAt()=" + getCreatedAt()
				+ ", getModifiedAt()=" + getModifiedAt() + "]";
	}    
    
}

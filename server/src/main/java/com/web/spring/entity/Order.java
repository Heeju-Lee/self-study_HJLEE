package com.web.spring.entity;
import java.sql.Date;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Order {
	
	@Id
	@Column(name = "o_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderNum;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date date;
	private int amount;
	private String payType;
	
	
    /*주문-부모 다대일 연관관계*/
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="p_num")
	Parent parent;
	
	@Override
	public String toString() {
		return "Order [orderNum=" + orderNum + ", date=" + date + ", amount=" + amount + ", payType=" + payType + "]";
	}
	
	
	

}

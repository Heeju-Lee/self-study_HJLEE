
package com.web.spring.entity;

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
public class StockOrder {
	@Id
	@Column(name="s_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long SNum;
	
	private String name;
	
	private String code;
	
	private int price;
	
	private int quantity;
	
	private int amt;
	
    /*주식주문내역-아이 다대일 연관관계*/
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "c_num")
    Child child;

	@Override
	public String toString() {
		return "StockOrder [SNum=" + SNum + ", name=" + name + ", code=" + code + ", price=" + price + ", quantity="
				+ quantity + ", amt=" + amt + "]";
	}
}
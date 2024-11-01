package com.web.spring.entity;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class Plan{
	@Id
	@Column(name="plan_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long planNum;
	
	private int shopping;
	
	private int food;
	
	private int transport;
	
	private int cvs;
	
	private int saving;
	
	private int others;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate date;	
	
	@Override
	public String toString() {
		return "plan [planNum=" + planNum + ", shopping=" + shopping + ", food=" + food + ", transport=" + transport
				+ ", cvs=" + cvs + ", saving=" + saving + ", others=" + others + ", date=" + date + "]";
	}
	
	
}
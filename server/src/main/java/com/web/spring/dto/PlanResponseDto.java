package com.web.spring.dto;

import com.web.spring.entity.Plan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanResponseDto {
	
	private int shopping;
	private int transport;
	private int cvs;
	private int food;
	private int others;
	private int saving;
	
	public PlanResponseDto (Plan plan) {
		
		shopping = plan.getShopping();
		transport = plan.getTransport();
		cvs = plan.getCvs();
		food= plan.getFood();
		others = plan.getOthers();
		saving = plan.getSaving();
	}
	
}

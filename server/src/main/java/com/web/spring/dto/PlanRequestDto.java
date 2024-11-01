package com.web.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import com.web.spring.entity.Plan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlanRequestDto {

	private int shopping;
	private int transport;
	private int cvs;
	private int food;
	private int others;
	private int saving;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate date;
	
	public Plan toPlan(PlanRequestDto planResponseDto) {
		
		return Plan.builder()
					.shopping(planResponseDto.getShopping())
					.transport(planResponseDto.getTransport())
					.cvs(planResponseDto.getCvs())
					.food(planResponseDto.getFood())
					.others(planResponseDto.getOthers())
					.saving(planResponseDto.getSaving())
					.date(planResponseDto.getDate())
					.build();
	}
	
	
	
}

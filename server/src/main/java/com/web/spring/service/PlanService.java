package com.web.spring.service;

import java.time.LocalDate;
import org.springframework.stereotype.Service;

import com.web.spring.dto.PlanRequestDto;
import com.web.spring.dto.PlanResponseDto;
import com.web.spring.entity.Plan;
import com.web.spring.repository.PlanRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanService {

	
	private final PlanRepository planRepository;
	
	//소비 계획 세우기
	@Transactional
	public void createPlan(Long cNum, PlanRequestDto planRequestDto )throws Exception{
		
		Plan plan = planRequestDto.toPlan(planRequestDto);
		
		planRepository.save(plan);
		
		System.out.println("createPlan : " + plan);
	}
	
	//소비 계획 조회하기
	@Transactional
	public PlanResponseDto showPlan(Long cNum,  LocalDate date) throws Exception{
	
		
		Plan plan = planRepository.findByDate(cNum, date);
		
		
		System.out.println("showPlan : " + plan);
		
		return new PlanResponseDto(plan);
	}
	
	
	//소비 계획 수정하기
	@Transactional
	public PlanResponseDto updatePlan(Long cNum, Long planNum, PlanRequestDto planRequestDto) throws Exception {
		
		Plan planEntity = planRepository.findById(planNum)
					.orElseThrow();
		
		planEntity.setShopping(planRequestDto.getShopping());
		planEntity.setCvs(planRequestDto.getCvs());
		planEntity.setFood(planRequestDto.getFood());
		planEntity.setOthers(planRequestDto.getOthers());
		planEntity.setSaving(planRequestDto.getSaving());
		planEntity.setTransport(planRequestDto.getTransport());
		
		
		return new PlanResponseDto(planEntity);
		
	}
}

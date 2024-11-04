package com.web.spring.service;

import java.time.LocalDate;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Plan;
import com.web.spring.repository.ChildRepository;
import com.web.spring.repository.PlanRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlanService {

	
//	private final PlanRepository planRepository;
//	private final ChildRepository childRepository;
//	
//	//소비 계획 세우기
//	@Transactional
//	public PlanResponseDto createPlan(PlanRequestDto planRequestDto ){
//		
//		//1. client에서 c_num 넣어주는 방법 -> PlanRequestDto 사용
//		//2. JWT 토큰 까서 c_num 확인하는 방법
//		//c_num 받았다고 치고
//		System.out.println(planRequestDto.getChildNum());
//		
//		Child child =childRepository.findById(planRequestDto.getChildNum())
//										.orElseThrow( () -> new NoSuchElementException("Child with cNum " + planRequestDto.getChildNum() + " not found"));
//		
//		
//		System.out.println(child);
//		
//		Plan plan = planRequestDto.toPlan(planRequestDto);
//		plan.setChild(child);
//		
//		planRepository.save(plan);
//		
//		return new PlanResponseDto(plan);
//	}
//	
//	//소비 계획 조회하기
//	@Transactional
//	public PlanResponseDto showPlan(LocalDate date) throws Exception{
//	
//		//토큰 까서 childNum 받았다 치고,
//		Child child =childRepository.findById(1L).orElseThrow();
//		System.out.println(child);
//
//		Plan plan = planRepository.findByDate(child.getChildNum(), date);
//		
//		System.out.println("showPlan : " + plan);
//		
//		return new PlanResponseDto(plan);
//	}
//	
//	
//	//소비 계획 수정하기
//	@Transactional
//	public PlanResponseDto updatePlan(Long planNum, PlanRequestDto planRequestDto) throws Exception {
//		
//		Plan plan = planRepository.findById(planNum)
//										.orElseThrow();
//		
//		plan.setShopping(planRequestDto.getShopping());
//		plan.setCvs(planRequestDto.getCvs());
//		plan.setFood(planRequestDto.getFood());
//		plan.setOthers(planRequestDto.getOthers());
//		plan.setSaving(planRequestDto.getSaving());
//		plan.setTransport(planRequestDto.getTransport());
//		plan.setDate(planRequestDto.getDate());
//		
//		return new PlanResponseDto(plan);
//		
//	}
}

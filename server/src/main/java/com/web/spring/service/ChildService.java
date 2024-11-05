package com.web.spring.service;

import java.time.LocalDate;
import java.util.NoSuchElementException;

import com.web.spring.entity.Parent;
import com.web.spring.repository.ParentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Plan;
import com.web.spring.repository.ChildRepository;
import com.web.spring.repository.PlanRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildService {

	private final ChildRepository childRepository;
	private final PlanRepository planRepository;
	private final ParentRepository parentRepository;
	
/* Child : 회원가입 */	
	@Transactional
	public ChlidResponseDto singUp(ChildRequestDto childRequestDto) {
		
		Child child = childRequestDto.toChild(childRequestDto);

		Long parentNum =childRequestDto.getParentNum();
		Parent parent = parentRepository.findById(parentNum).orElseThrow();

		child.setParent(parent);
		Child rChild = childRepository.save(child);
		
		System.out.println("rChild : " + rChild);
		
		return new ChlidResponseDto(rChild);
				
	}
	
	@Transactional(readOnly = true)
	public String duplicateCheck(String id) {
		
		Child rMember = childRepository.duplicateCheck(id);
		System.out.println( "rMember ==> " +  rMember);
		
		if(rMember == null) return "아이디 사용 가능";
		else return "아이디 사용 불가";
		
	}

	@Transactional
	public Child findChild(Long childNum){

		Child child = childRepository.findById(childNum)
				  					 .orElseThrow( () -> new NoSuchElementException("Child with cNum not found"));

		return child;
	}

	
/* Plan : 소비 계획 세우기 */
	@Transactional
	public PlanResponseDto createPlan(PlanRequestDto planRequestDto ){
		
		//1. client에서 c_num 넣어주는 방법 -> PlanRequestDto 사용
		//2. JWT 토큰 까서 c_num 확인하는 방법
		//c_num 받았다고 치고.
		Child child = findChild(planRequestDto.getChildNum());
		System.out.println(child);
		
		Plan plan = planRequestDto.toPlan(planRequestDto);
		
		planRepository.save(plan);
		child.getPlans().add(plan);
		
		return new PlanResponseDto(plan);
	}
	
	//소비 계획 조회하기
	@Transactional
	public PlanResponseDto showPlan(String year, String month) throws Exception{
	
		//토큰 까서 childNum 받았다 치고,
		Child child =findChild(1L);
		System.out.println(child);
		
		Plan plan = childRepository.findPlanByDate(Integer.parseInt(year), Integer.parseInt(month) );
		
		System.out.println("showPlan : " + plan);
		
		return new PlanResponseDto(plan);
	}
	
	
	//소비 계획 수정하기
	@Transactional
	public PlanResponseDto updatePlan(Long planNum, PlanRequestDto planRequestDto) throws Exception {
		
		Plan plan = planRepository.findById(planNum)
								  .orElseThrow();
		
		plan.setShopping(planRequestDto.getShopping());
		plan.setCvs(planRequestDto.getCvs());
		plan.setFood(planRequestDto.getFood());
		plan.setOthers(planRequestDto.getOthers());
		plan.setSaving(planRequestDto.getSaving());
		plan.setTransport(planRequestDto.getTransport());
		
		return new PlanResponseDto(plan);
	}

	
}

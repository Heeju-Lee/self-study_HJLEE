package com.web.spring.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Payment;
import com.web.spring.entity.Plan;
import com.web.spring.repository.ChildRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildService {

	private final ChildRepository childRepository;
	
	@Transactional
	public ChlidResponseDto singUp(ChildRequestDto childRequestDto) {
		
		Child child = childRequestDto.toChild(childRequestDto);
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

	@Transactional(readOnly = true)
	public HashMap<String,Integer> monthPayment(Long child,int year,int month){
		HashMap<String, Integer> monthlyPay = new HashMap<>(); 
		int childNum = child.intValue();
		List<Payment> monthPay = childRepository.findMonthPayment(childNum, year, month);
		
		for(Payment p : monthPay) {
			monthlyPay.put(p.getCategory(), p.getPaymentAmt());
		}
		return monthlyPay;
		
	}
	
	@Transactional(readOnly = true)
	public HashMap<String, Integer> monthPlan(Long child, int year,int month){
		HashMap<String, Integer> monthlyPlan = new HashMap<>(); 
		int childNum = child.intValue();
		List<Plan> monthPlan = childRepository.findMonthPlan(childNum, year, month);
		
		for(Plan p : monthPlan) {
			monthlyPlan.put("shopping", p.getShopping());
			monthlyPlan.put("food", p.getFood());
			monthlyPlan.put("transport", p.getTransport());
			monthlyPlan.put("cvs", p.getCvs());
			monthlyPlan.put("saving", p.getSaving());
			monthlyPlan.put("others", p.getOthers());
		}
		
		return monthlyPlan;
	}
	
	@Transactional(readOnly = true)
	public  HashMap<String, Integer> showQuizResult(Long child){
		HashMap<String, Integer> result = new HashMap<>();
		
		Child qr= childRepository.findById(child).get();
		
		//환율결과 넣기
		result.put("qExchangeRate", qr.getQExchangeRate());
		//투자 결과 넣기
		result.put("qInvestment", qr.getQInvestment());
		//경제용어결과 넣기
		result.put("qWord", qr.getQWord());
		//정부결과 넣기
		result.put("qGoverment", qr.getQGoverment());
		//경제의 역사 결과 넣기
		result.put("qHistory", qr.getQHistory());
		
		return result;
	}
	
	
	public LinkedHashMap<String,Integer> showQuizResultTop3(Long child){
		LinkedHashMap<String, Integer> result = new LinkedHashMap<>();
		
		Child qr= childRepository.findById(child).get();
		
		//환율결과 넣기
		result.put("qExchangeRate", qr.getQExchangeRate());
		//투자 결과 넣기
		result.put("qInvestment", qr.getQInvestment());
		//경제용어결과 넣기
		result.put("qWord", qr.getQWord());
		//정부결과 넣기
		result.put("qGoverment", qr.getQGoverment());
		//경제의 역사 결과 넣기
		result.put("qHistory", qr.getQHistory());
		
		result.entrySet().stream()
				.sorted(Map.Entry.comparingByValue())
				.limit(3);
		
		return result;
		
	}
	
	
	
	
	
}

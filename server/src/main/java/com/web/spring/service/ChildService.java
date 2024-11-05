package com.web.spring.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
	
	
	public HashMap<String,Integer> showQuizResultTop3(Long child){
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
		
		HashMap<String, Integer> sortedResult = result.entrySet()
			    .stream()
			    .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())) // 값 내림차순 정렬
			    .limit(3) // 상위 3개만 선택
			    .collect(Collectors.toMap(
			        Map.Entry::getKey,
			        Map.Entry::getValue,
			        (e1, e2) -> e1, // 중복 키가 발생할 경우 해결 방법 (여기서는 첫 번째 값 유지)
			        LinkedHashMap::new // 순서를 유지하기 위해 LinkedHashMap 사용
			    ));
		
		System.out.println(sortedResult);
		return sortedResult;
		
	}
	
	
	
	
	
}

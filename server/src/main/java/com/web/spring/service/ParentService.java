package com.web.spring.service;


import com.web.spring.dto.SignInResponseDto;
import com.web.spring.dto.SignUpRequestDto;
import com.web.spring.dto.parent.ParentReportResponseDto;
import com.web.spring.dto.parent.PointOrderRequestDto;
import com.web.spring.dto.parent.PointOrderResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Parent;
import com.web.spring.entity.PointOrder;
import com.web.spring.repository.ChildRepository;
import com.web.spring.repository.ParentRepository;
import com.web.spring.repository.PointOrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParentService {

    private final ChildService childService;
    private final ChildRepository childRepository;
    private final ParentRepository parentRepository;
    private final PointOrderRepository pointOrderRepository;
    
	private final PasswordEncoder passwordEncoder;
    
	@Transactional
	public SignInResponseDto singUp(SignUpRequestDto signUpRequestDto) {
		
		Parent parent = signUpRequestDto.toParent(signUpRequestDto);
		
		//비번 암호화
		String encPwd = passwordEncoder.encode(parent.getPwd());
		log.info("encPwd ==> { }", encPwd);
		parent.setPwd(encPwd);

		//Role 설정
		parent.setRole("ROLE_PARENT");

		// 아이 DB 저장
		Parent rParent = parentRepository.save(parent);
		
		return new SignInResponseDto(rParent);
	}

	@Transactional(readOnly = true)
	public String duplicateCheck(String id) {
		
		Parent rParent = parentRepository.duplicateCheck(id);
		System.out.println( "rParent ==> " +  rParent);
		
		if(rParent == null) return "아이디 사용 가능";
		else return "아이디 사용 불가";
		
	}
    

    //부의 모든 자식 가져오기
    @Transactional
    public List<Child> findChildren(Long parentNum) {

        Parent parent = parentRepository.findById(parentNum).orElseThrow();

        return parent.getChildren();

    }

        //부모가 자기 자식 찾기
    @Transactional
    public Child findParentChild(Long parentNum, Long childNum){
    	
    	System.out.println(parentNum +"," + childNum);

        Parent parent = parentRepository.findById(parentNum).orElseThrow();
        
        System.out.println(parent.toString() + " " + parent.getChildren().get(0));

        parent.getChildren().stream()
			                .filter(c -> c.getChildNum().equals(childNum))
			                .forEach(c -> System.out.println(c));
        
        
        return  parent.getChildren().stream()
							        .filter(c -> c.getChildNum().equals(childNum))
							        .findFirst()
                					.orElseThrow();
    }

    /* 월간 리포트 */
    @Transactional
    public ParentReportResponseDto getChildReport(Child child, String year, String month){


        //Chart1 - 카테고리 별 소비 현황
        HashMap<String, Integer> chartPayment = childService.showMonthChart(child.getChildNum(), Integer.parseInt(year), Integer.parseInt(month));

        //Chart1- 카테고리 별 계획
        HashMap<String, Integer> monthPlan =childService.monthPlan(child.getChildNum(), Integer.parseInt(year), Integer.parseInt(month));

        //Chart2 - Top3.
        LinkedHashMap<String, Integer> showQuizResultTop3= childService.showQuizResultTop3(child.getChildNum());

        //Chart2 - 방사형 교육 차트
        HashMap<String,Integer> showQuizResult =childService.showQuizResult(child.getChildNum());



        return new ParentReportResponseDto(chartPayment, monthPlan, showQuizResultTop3, showQuizResult);
    }

	public PointOrderResponseDto createPointOrders(Long parentNum, PointOrderRequestDto pointOrderRequestDto) {
		
		Parent parent = parentRepository.findById(parentNum).orElseThrow();
		
		PointOrder pointOrder = pointOrderRequestDto.toPointOrder(pointOrderRequestDto);
		
		System.out.println(pointOrder);
		
		PointOrder rpointOrder =pointOrderRepository.save(pointOrder);		
		parent.getOrders().add(rpointOrder);
		
		//아이의 포인트 증가
		// 기존 포인트 잔액 조회
		Optional<Integer> curPoint = childRepository.showPoint(pointOrderRequestDto.getChildNum());
		childRepository.updatePoint(curPoint.get() + pointOrderRequestDto.getAmount(), pointOrderRequestDto.getChildNum());
		
		return new PointOrderResponseDto(rpointOrder);
	}
	
	public List<PointOrder> getPointOrders(long parentNum, Long childNum, String year, String month) {
		
		Parent parent = parentRepository.findById(parentNum).orElseThrow();
		return parent.getOrders().stream()
						        .filter(pOrder -> pOrder.getChildNum().equals(childNum) &&
						                pOrder.getCreatedAt().getYear() == Integer.parseInt(year) &&
						                pOrder.getCreatedAt().getMonthValue() == Integer.parseInt(month))
						        .collect(Collectors.toList());
		
	}
	


}

package com.web.spring.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.web.spring.entity.Parent;
import com.web.spring.entity.Payment;
import com.web.spring.repository.ParentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.quiz.QuizResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.Plan;
import com.web.spring.entity.Quiz;
import com.web.spring.exception.NotEnoughPointsException;
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

		//목업 데이터 저장
		List<Payment> payments = childRepository.showMonthPayments(child.getChildNum());
		child.setPayments(payments);
		
		return new PlanResponseDto(plan);
	}
	
	//소비 계획 조회하기
	@Transactional
	public PlanResponseDto showPlan(String year, String month) throws Exception{
	
		//토큰 까서 childNum 받았다 치고,
		Child child =findChild(1L);
		System.out.println(child);
		
		Plan plan = childRepository.findPlanByDate(Integer.parseInt(year), Integer.parseInt(month) );
		
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
	

	// 포인트 조회
	@Transactional
	public int showPoint(Long childNum) {
		return childRepository.showPoint(childNum)
				.orElseThrow(() -> new NotEnoughPointsException("포인트 값이 존재하지 않습니다."));
	}
	
	// 포인트 업데이트
	@Transactional
	public int updatePoint(Long childNum, int point) {
		// 기존 포인트 잔액 조회
		Optional<Integer> curPoint = childRepository.showPoint(childNum);
	    // 기존 포인트 존재유무 체크
		if (!curPoint.isPresent()) {
			throw new NotEnoughPointsException("포인트가 존재하지 않습니다.");
		}
		
		int updatedPoint = curPoint.get() + point;
		
		// 차감후 포인트 음수인 경우
		if(updatedPoint < 0) {
			throw new NotEnoughPointsException("포인트가 부족합니다.");
		}
		
		// 포인트 업데이트
		childRepository.updatePoint(curPoint.get() + point, childNum);
		
		// 변경된 포인트 반환 
		return updatedPoint;			
	}



	// 이번달 소비내역
	@Transactional(readOnly = true)
	public List<Payment> showMonthList(String childNum, String year, String month) {

		Child child = findChild(Long.valueOf(childNum));
		System.out.println(child);
		List<Payment> payments = child.getPayments();
		List<Payment> monthPayment = new ArrayList<>();

		payments.forEach( payment -> {

			LocalDate date = payment.getCreatedAt();
			if( date.getMonthValue() == Integer.parseInt(month) && date.getYear() == Integer.parseInt(year)){
				monthPayment.add(payment);
			}
		});

		return monthPayment;
	}
	
	// 이번달 카테고리별 소비내역
	@Transactional(readOnly = true)
	public HashMap<String, Integer> showMonthChart(String childNum, String year, String month) {
	    List<Payment> payments = showMonthList(childNum, year, month);
	    
	    HashMap<String, Integer> categoryTotal = new HashMap<>();

	    payments.forEach(payment -> {
	        String category = payment.getCategory();
	        int amount = payment.getPaymentAmt();
	        
	        categoryTotal.put(category, categoryTotal.getOrDefault(category, 0) + amount);
	    });

	    return categoryTotal;
	}
	
	// 퀴즈문제 보여주기
	@Transactional(readOnly = true)
	public List<Quiz> showQuiz() {	
		// 카테고리 리스트 생성
        List<String> categories = Arrays.asList("history", "investment", "government", "exchangeRate", "word");
        List<Quiz> quizList = new ArrayList<>();

        for (String category : categories) {
            List<Quiz> result = childRepository.findQuizByCategoryRandom(category);
            // 결과가 비어있지 않은 경우 첫 번째 퀴즈를 선택하여 리스트에 추
            if (!result.isEmpty()) {
            	quizList.add(result.get(0));
            }
        }

        return quizList;
    }
	
	// 퀴즈 업데이트
	/* 
	 * 과정
	 * 문제를 클라이언트에 전달
	 * 유저가 문제를 풀때마다 문제 정답과 비교하여 QuizResponseDto 형태로 넣음 (클라이언트 작업)
	 * 문제 완료후 list<QuizResponseDto> 를 받아 updateQuiz 진행
	 */
	@Transactional
	public void updateQuiz(Long childNum, List<QuizResponseDto> quizResponse) {
		Child child = childRepository.findById(childNum).orElseThrow();
		
		// 각 퀴즈 답 확인해서 점수 업데이트 함
		for(QuizResponseDto response: quizResponse) {
			if(response.getScore() == 1) { //문제 맞춘 경우
                switch (response.getCategory()) {
                case "history":
                    child.setQHistory(child.getQHistory() + 1);
                    System.out.println("history");
                    break;
                case "investment":
                    child.setQInvestment(child.getQInvestment() + 1);
                    break;
                case "government":
                    child.setQGoverment(child.getQGoverment() + 1);
                    break;
                case "word":
                    child.setQWord(child.getQWord() + 1);
                    break;
                case "exchangeRate":
                    child.setQExchangeRate(child.getQExchangeRate() + 1);
                    break;
                default:
                    break;
                }
			}
		}
		
		childRepository.save(child);
	}

}

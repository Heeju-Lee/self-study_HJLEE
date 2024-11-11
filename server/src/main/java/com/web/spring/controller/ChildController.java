package com.web.spring.controller;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import com.web.spring.entity.Member;
import com.web.spring.entity.Payment;
import com.web.spring.entity.Quiz;
import com.web.spring.entity.Wish;
import com.web.spring.security.CustomMemberDetails;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.web.spring.dto.child.wish.WishRequestDto;
import com.web.spring.dto.child.wish.WishResponseDto;
import com.web.spring.dto.SignInResponseDto;
import com.web.spring.dto.SignUpRequestDto;
import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.point.PointRequestDto;
import com.web.spring.dto.child.quiz.QuizResponseDto;

import com.web.spring.service.ChildService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/children")
@Slf4j
public class ChildController { 

	private final ChildService childService;

/* Child : 회원가입  --------------------------------------------------------------*/
	@PostMapping("/signup")
	public ResponseEntity<?> singUp(@RequestBody SignUpRequestDto sinUpRequestDto ){
		
		SignInResponseDto response = childService.singUp(sinUpRequestDto);

				
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}

	@GetMapping("/{id}")
	public String duplicationCheck(@PathVariable String id){
		return childService.duplicateCheck(id);
	}

	

	

/* Plan : 소비 계획 세우기 --------------------------------------------------------------*/
	@PostMapping("/plans")
	public ResponseEntity<PlanResponseDto> createPlan( @RequestBody PlanRequestDto planRequestDto){
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
//		System.out.println("### getPrincipal : "+ authentication.getPrincipal().toString());
//		System.out.println("### getCredentials : "+ authentication.getCredentials()); //password
//		System.out.println("### getDetails : "+ authentication.getDetails());
//		System.out.println("### getName : "+ authentication.getName()); //userId
//		System.out.println("### getClass : "+ authentication.getClass());
//		
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getPrincipal();
		Member m = customMemberDetails.getMember();
//		log.info("customMemberDetails =  {} ,{} ,{}, {} ", m.getId(), m.getName(), m.getRole(), m.getMemberNo());
		
		
		//System.out.println(planRequestDto);
		
		PlanResponseDto response = childService.createPlan( m.getMemberNum(), planRequestDto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
							 .body(response);
	}
	

	@GetMapping("/plans")
	public ResponseEntity<PlanResponseDto> showPlan(	@PathVariable String childNum,
														@RequestParam  String year,
														@RequestParam  String month) throws Exception{
	
		PlanResponseDto response = childService.showPlan( 1L, 2024, 11);
		System.out.println(response);
		
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@PutMapping("/plans/{planNum}")
	public ResponseEntity<PlanResponseDto>updatePlan (@PathVariable String planNum,
										@RequestBody PlanRequestDto planRequestDto) throws Exception{
		
		PlanResponseDto plan = childService.updatePlan(Long.parseLong(planNum), planRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(plan);	
	}

	
/* MGMT  --------------------------------------------------------------*/

	//이번달 소비리스트
	@GetMapping("/payments/{childNum}")
	public ResponseEntity<List<Payment>> showMonthList(	@PathVariable String childNum,
														@RequestParam  String year,
														@RequestParam  String month){


		List<Payment> response = childService.showMonthList(Long.parseLong(childNum), Integer.parseInt(year), Integer.parseInt(month));
		System.out.println(response);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	//이번달 소비리스트
	@GetMapping("/payments/chart/{childNum}")
	public ResponseEntity<HashMap<String, Integer>> showMonthChart(	@PathVariable String childNum,
												@RequestParam  String year,
												@RequestParam  String month){

		HashMap<String, Integer> response = childService.showMonthChart(Long.valueOf(childNum), Integer.parseInt(year), Integer.parseInt(month));
		System.out.println(response);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/*이달의 계획 내역 도넛차트*/
	@GetMapping("/plan/chart/{childNum}")
	public ResponseEntity<HashMap<String, Integer>> monthPlan(	@PathVariable String childNum,
										@RequestParam String year,
									   	@RequestParam String month) {

		HashMap<String, Integer> response = childService.monthPlan(Long.valueOf(childNum) ,Integer.parseInt(year), Integer.parseInt(month));

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	//포인트 조회
	@GetMapping("/point/{childNum}")
	public ResponseEntity<Integer> showPoint(@PathVariable Long childNum){

		int response = childService.showPoint(childNum);
		return ResponseEntity.status(HttpStatus.OK)
							.body(response);
	}
	
	//포인트 업데이트
	@PutMapping("/point")
	public ResponseEntity<Integer> updatePoint(@RequestBody PointRequestDto request){

		int response = childService.updatePoint(request.getChildNum(), request.getPoint());
		return ResponseEntity.status(HttpStatus.OK).body(response);

	}
	
/* WISH -------------------------------------------------------------------------*/
	//위시 등록하기
	@PostMapping(value = "/wishes", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> createWish(@RequestParam("wishRequestDtoJson") String wishRequestDtoJson, @RequestPart("wishFile") MultipartFile wishFile) throws IOException{
		
        // wishRequestDtoJson을 DTO로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        WishRequestDto wishRequestDto = objectMapper.readValue(wishRequestDtoJson, WishRequestDto.class);
        
        // DTO 변환이 제대로 되었는지 확인
        if (wishRequestDto == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            					.body("Invalid wish request data.");
        }
        
        // wish 를 생성
		WishResponseDto wish =  childService.createWish(wishRequestDto, wishFile);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(wish);
	}	
	
	//위시 전체리스트 조회(Active)
	@GetMapping("/wishes/active/{childNum}")
	public ResponseEntity<List<Wish>> showActiveWishList(@PathVariable Long childNum){
		
		List<Wish> wishList = childService.showActiveWishList(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wishList);
	}
	
	//위시 전체리스트 조회(Finished)
	@GetMapping("/wishes/finished/{childNum}")
	public ResponseEntity<List<Wish>> showFinishedWishList(@PathVariable String childNum){
		
		List<Wish> wishList = childService.showFinishedWishList(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wishList);
	}
	
	//위시 상세보기
	@GetMapping("/wishes/{wishNum}")
	public ResponseEntity<WishResponseDto> showWishDetail(@PathVariable String wishNum){
		WishResponseDto response = childService.showWishDetail(wishNum);
		
		return ResponseEntity.status(HttpStatus.OK)
	 			 .body(response);
	}	
	
	//위시 돈모으기 
	@PutMapping("/wishes")
	public ResponseEntity<WishResponseDto> savingWish(@RequestParam String wishNum,
										@RequestParam String savingAmt){
		
		WishResponseDto wish =childService.savingWish(wishNum, savingAmt);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wish);
	}
	
	//위시 삭제하기
	@DeleteMapping("/wishes/{wishNum}")
	public ResponseEntity<List<Wish>> deleteWish(@PathVariable String wishNum) throws IOException{
		List<Wish> wishList = childService.deleteWish(wishNum);
		
		return ResponseEntity.status(HttpStatus.OK)
	 			 .body(wishList);
	}

	
/* Quiz : 퀴즈 ----------------------------------------------------------------------------*/	
	/*아이의 퀴즈 결과 보여주기	*/
	@GetMapping("/quiz/{childNum}")
	public ResponseEntity<HashMap<String, Integer>> showQuizResult( @PathVariable Long childNum){

		HashMap<String, Integer> response = childService.showQuizResult(childNum);

		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	/*아이의 퀴즈 결과를 top3로 나눠서 보여주기*/
	@GetMapping("quiz/top3/{childNum}")
	public ResponseEntity<HashMap<String, Integer>> showQuizResultTop3(@PathVariable Long childNum){
		
		HashMap<String, Integer> response = childService.showQuizResultTop3(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	//퀴즈 문제 내기 (각 카테고리 별 문제 1개씩 랜덤)
	@GetMapping("/quiz")
	public ResponseEntity<List<Quiz>> showQuiz() {
		List<Quiz> quizList = childService.showQuiz();
		
		return ResponseEntity.ok(quizList);
	}
	
	//퀴즈 업데이트
	@PutMapping("/quiz/{childNum}")
	public ResponseEntity<?> updateScore(@PathVariable Long childNum,
										 @RequestBody List<QuizResponseDto> quizResponse){
		// 헤당 childNum 에 퀴즈 업데이트
		childService.updateQuiz(childNum, quizResponse);
		
		return ResponseEntity.ok(HttpStatus.OK);
  }
	
	
}

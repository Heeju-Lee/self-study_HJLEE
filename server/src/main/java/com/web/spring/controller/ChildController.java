package com.web.spring.controller;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import com.web.spring.entity.Child;
import com.web.spring.entity.Member;
import com.web.spring.entity.Parent;
import com.web.spring.entity.Payment;
import com.web.spring.entity.Quiz;
import com.web.spring.repository.ChildRepository;
import com.web.spring.repository.ParentRepository;
import com.web.spring.security.CustomMemberDetails;
import com.web.spring.entity.Wish;
import com.web.spring.jwt.LoginFilter;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.web.spring.dto.child.ChildRequestDto;
import com.web.spring.dto.child.ChlidResponseDto;
import com.web.spring.dto.child.wish.WishRequestDto;
import com.web.spring.dto.child.wish.WishResponseDto;
import com.web.spring.dto.child.payment.PayRequestDto;

import com.web.spring.dto.child.plan.PlanRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.child.point.PointRequestDto;
import com.web.spring.dto.child.quiz.QuizResponseDto;

import com.web.spring.service.ChildService;
import com.web.spring.service.ParentService;
import com.web.spring.service.WishService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChildController { 

	private final ChildService childService;
	private final WishService wishService;

/* Child : 회원가입 + 중복 체크 --------------------------------------------------------------*/
	@PostMapping("/children/signup")
	public ResponseEntity<?> singUp(@RequestBody ChildRequestDto childRequestDto){
		
		
		ChlidResponseDto response = childService.singUp(childRequestDto);
				
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}

	@GetMapping("/children/{id}")
	public String duplicationCheck(@PathVariable String id){
		return childService.duplicateCheck(id);
	}




/* Plan : 소비 계획 세우기 --------------------------------------------------------------*/
	@PostMapping("/plans")
	public ResponseEntity<?> createPlan(@RequestHeader  @RequestBody PlanRequestDto planRequestDto){
		
		System.out.println(planRequestDto);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("1. authentication = {}" , authentication);
		SecurityContext context = SecurityContextHolder.getContext();
		
		//시큐리티에 저장된 정보 조회
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getPrincipal();
		log.info("3. Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
		String num = mem.getId();
		System.out.println("controller 의 num"+num);
		PlanResponseDto response = childService.createPlan(planRequestDto,Long.parseLong(num));
		
		return ResponseEntity.status(HttpStatus.CREATED)
							 .body(response);
	}
	
	//의문 plan 은 childNum은 왜?없지?
	@GetMapping("/plans")
	public ResponseEntity<?> showPlan(	@RequestParam  String year,
										@RequestParam  String month) throws Exception{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {} 여기를 체크중" , authentication);

		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
		PlanResponseDto response = childService.showPlan(year, month,mem);
		System.out.println(response);
		
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	@PutMapping("/plans/{planNum}")
	public ResponseEntity<?>updatePlan (@PathVariable String planNum,
										@RequestBody PlanRequestDto planRequestDto) throws Exception{
		
		PlanResponseDto plan = childService.updatePlan(Long.parseLong(planNum), planRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(plan);	
	}

	
/* MGMT  --------------------------------------------------------------*/

	//이번달 소비리스트
	@GetMapping("/payments/{childNum}")
	public ResponseEntity<?> showMonthList(	@PathVariable String childNum,
											@RequestParam  String year,
											@RequestParam  String month){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {}" , authentication);

		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();

		List<Payment> response = childService.showMonthList(mem.getMemberNum(), Integer.parseInt(year), Integer.parseInt(month));
		System.out.println(response);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	//이번달 소비리스트
	@GetMapping("/payments/chart")
	public ResponseEntity<?> showMonthChart(	@RequestParam  String year,
												@RequestParam  String month){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {}" , authentication);
		
		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
		
		HashMap<String, Integer> response = childService.showMonthChart(mem.getMemberNum(), Integer.parseInt(year), Integer.parseInt(month));
		System.out.println(response);

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/*이달의 계획 내역 도넛차트*/
	@GetMapping("/plan/chart")
	public ResponseEntity<?> monthPlan(	@RequestParam String year,
									   	@RequestParam String month) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {}" , authentication);
		
		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
		HashMap<String, Integer> response = childService.monthPlan(mem.getMemberNum() ,Integer.parseInt(year), Integer.parseInt(month));

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
	
	//포인트 조회
	@GetMapping("/getpoint")
	public ResponseEntity<?> showPoint(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {}" , authentication);
		
		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
		int response = childService.showPoint(mem.getMemberNum());
		return ResponseEntity.status(HttpStatus.OK)
							.body(response);
	}
	
	//포인트 업데이트
	@PutMapping("/point")
	public ResponseEntity<?> updatePoint(@RequestBody PointRequestDto request){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("authentication = {}" , authentication);
		
		//시큐리티에 저장된 정보 조회
		String name = authentication.getName();//아이디
		CustomMemberDetails customMemberDetails = (CustomMemberDetails) authentication.getDetails();
		log.info("Authentication getName =  {} " , name);
		log.info("Authentication  CustomMemberDetails =  {} " ,  customMemberDetails);
		Member mem = customMemberDetails.getMember();
	
		int response = childService.updatePoint(mem.getMemberNum(), request.getPoint());
		return ResponseEntity.status(HttpStatus.OK).body(response);

	}
	
/* WISH -------------------------------------------------------------------------*/
	//위시 등록하기
	@PostMapping("/wishes")
	public ResponseEntity<?> createWish(@RequestBody WishRequestDto wishRequestDto){
		
		WishResponseDto wish =  childService.createWish(wishRequestDto);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(wish);
	}	
	
	//위시 전체리스트 조회(Active)
	@GetMapping("/wishes/active/{childNum}")
	public ResponseEntity<?> showActiveWishList(@PathVariable String childNum){
		
		List<Wish> wishList = childService.showActiveWishList(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wishList);
	}
	
	//위시 전체리스트 조회(Finished)
	@GetMapping("/wishes/finished/{childNum}")
	public ResponseEntity<?> showFinishedWishList(@PathVariable String childNum){
		
		List<Wish> wishList = childService.showFinishedWishList(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wishList);
	}
	
	//위시 상세보기
	@GetMapping("/wishes/{wishNum}")
	public ResponseEntity<?> showWishDetail(@PathVariable String wishNum){
		WishResponseDto response = childService.showWishDetail(wishNum);
		
		return ResponseEntity.status(HttpStatus.OK)
	 			 .body(response);
	}	
	
	//위시 돈모으기 
	@PutMapping("/wishes")
	public ResponseEntity<?> savingWish(@RequestParam String wishNum,
										@RequestParam String savingAmt){
		
		WishResponseDto wish =childService.savingWish(wishNum, savingAmt);
		
		return ResponseEntity.status(HttpStatus.OK)
				 			 .body(wish);
	}
	
	//위시 삭제하기
	@DeleteMapping("/wishes/{wishNum}")
	public ResponseEntity<?> deleteWish(@PathVariable String wishNum){
		List<Wish> wishList = childService.deleteWish(wishNum);
		
		return ResponseEntity.status(HttpStatus.OK)
	 			 .body(wishList);
	}

	
/* Quiz : 퀴즈 ----------------------------------------------------------------------------*/	
	/*아이의 퀴즈 결과 보여주기	*/
	@GetMapping("/quiz/{childNum}")
	public ResponseEntity<?> showQuizResult( @PathVariable Long childNum){

		HashMap<String, Integer> response = childService.showQuizResult(childNum);

		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	/*아이의 퀴즈 결과를 top3로 나눠서 보여주기*/
	@GetMapping("quiz/top3/{childNum}")
	public ResponseEntity<?> showQuizResultTop3(@PathVariable Long childNum){
		
		HashMap<String, Integer> response = childService.showQuizResultTop3(childNum);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(response);
	}
	
	
	//퀴즈 문제 내기 (각 카테고리 별 문제 1개씩 랜덤)
	@GetMapping("/quiz")
	public ResponseEntity<?> showQuiz() {
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

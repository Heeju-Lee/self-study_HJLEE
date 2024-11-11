package com.web.spring.controller;

import com.web.spring.dto.SignInResponseDto;
import com.web.spring.dto.SignUpRequestDto;
import com.web.spring.dto.child.plan.PlanResponseDto;
import com.web.spring.dto.parent.ParentReportResponseDto;
import com.web.spring.dto.parent.PointOrderRequestDto;
import com.web.spring.dto.parent.PointOrderResponseDto;
import com.web.spring.entity.Child;
import com.web.spring.entity.PointOrder;
import com.web.spring.entity.Wish;
import com.web.spring.service.ChildService;
import com.web.spring.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/parents")
public class ParentController {

    private final ChildService childService;
    private final ParentService parentService;
    
    /* Parnet : 회원가입 + 중복 체크 --------------------------------------------------------------*/
	@PostMapping("/signup")
	public ResponseEntity<SignInResponseDto> singUp(@RequestBody SignUpRequestDto childRequestDto){
		
		SignInResponseDto response = parentService.singUp(childRequestDto);
				
		return ResponseEntity.status(HttpStatus.CREATED)
				 			 .body(response);
	}

	@GetMapping("/{id}")
	public String duplicationCheck(@PathVariable String id){
		return parentService.duplicateCheck(id);
	}


    @GetMapping("/{parentNum}")
    public ResponseEntity<List<Child>> getChildren(@PathVariable String parentNum){

        List<Child> children = parentService.findChildren(Long.valueOf(parentNum));
        return ResponseEntity.status(HttpStatus.OK).body(children);
    }


    /* 월간 리포트 */
    @GetMapping("/reports/{childNum}")
    public ResponseEntity<ParentReportResponseDto> getChildReports(@PathVariable String childNum,
                                            @RequestParam String year,
                                            @RequestParam String month){

        //토큰까서 parentNum 넣었다 치고
        Child child = parentService.findParentChild(1L, Long.parseLong(childNum));

        ParentReportResponseDto reponse = parentService.getChildReport(child, year, month);
        return ResponseEntity.status(HttpStatus.OK).body(reponse);
    }

    /* 아이에게 한 마디 */
    @PostMapping("/notifications/{childNum}")
    public ResponseEntity<?> createNotification(@PathVariable String childNum) {


        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /* 용돈 계약서 */
    @GetMapping("/contracts/{childNum}")
    public ResponseEntity<PlanResponseDto> getContracts(@PathVariable String childNum,
                                          @RequestParam String year,
                                          @RequestParam String month) throws Exception {

        //토큰까서 parentNum 넣었다 치고
        Child child = parentService.findParentChild(1L, Long.parseLong(childNum));

        PlanResponseDto  planResponseDto = childService.showPlan(1L,year,month);

        //추후에 결제 내역 가져오기

        return ResponseEntity.status(HttpStatus.OK).body(planResponseDto);
    }


    /* 위시 리스트 */
    @GetMapping("/wishes/{childNum}")
    public ResponseEntity<List<Wish>> getWishes(@PathVariable String childNum){

        //토큰까서 parentNum 넣었다 치고
        Child child = parentService.findParentChild(1L, Long.parseLong(childNum));

        List<Wish> wishes =childService.showActiveWishList(child.getChildNum());

        return ResponseEntity.status(HttpStatus.OK).body(wishes);
    }
    
    
    /* 포인트 결제*/
    @PostMapping("/orders/{parentNum}")
    public ResponseEntity<PointOrderResponseDto> creatPointOrders(@PathVariable String parentNum,
    										  						@RequestBody PointOrderRequestDto pointOrderRequestDto ){
    	
    	PointOrderResponseDto pointOrder = parentService.createPointOrders(Long.parseLong(parentNum), pointOrderRequestDto);
    	return ResponseEntity.status(HttpStatus.OK).body(pointOrder);
    	
    }
    
    
    /* 포인트 결제 내역 전체 보기*/
    @GetMapping("/orders/{parentNum}/{childNum}")
    public ResponseEntity<List<PointOrder>> getPointOrders(@PathVariable String parentNum,
				    										@PathVariable String childNum,
											    			@RequestParam String year,
											    			@RequestParam String month){
    	
    	
    	List<PointOrder> pointOrders = parentService.getPointOrders(Long.parseLong(parentNum), Long.parseLong(childNum), year, month ); 
    	
    	return ResponseEntity.status(HttpStatus.OK).body(pointOrders); 
    	
    }

}

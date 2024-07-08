package com.self.test;

import java.util.Arrays;

import com.self.parent.Employee;
import com.self.service.EmployeeService;
import com.self.util.MyDate;
import com.self.vo.Engineer;
import com.self.vo.Manager;
import com.self.vo.Secretary;

public class EmployeeServiceTest {

	public static void main(String[] args) {
		//1. Service 객체를 생성
		EmployeeService service = new EmployeeService(10);
		
		//2. method를 각각 호출..
		System.out.println("============ 1. addEmployee ============\n");
		
		service.addEmployee(new Manager("AAA", new MyDate(1978, 1, 1), 20000.0, "개발부", 10));
		service.addEmployee(new Manager("BBB", new MyDate(1975, 2, 1), 34000.0, "기획부", 20));
		service.addEmployee(new Manager("CCC", new MyDate(1980, 3, 3), 20000.0, "교육부", 30));
		service.addEmployee(new Manager("DDD", new MyDate(1995, 8, 1), 37000.0, "개발부", 10));
		service.addEmployee(new Engineer("EEE", new MyDate(1995,3,4), 350000.0, "Java", 200.0));
		service.addEmployee(new Engineer("FFF", new MyDate(1995,7,2), 350000.0, "Java", 200.0));
		service.addEmployee(new Engineer("GGG", new MyDate(1994,11,2), 450000.0, "Python", 300.0));
		service.addEmployee(new Secretary("HHH", new MyDate(1996,11,26), 600000.0,"Jeollme"));
		
		System.out.println("\n============ Manager list ============\n");
		service.printEmployee("Manager");
		
		System.out.println("\n============ Engineer list ============\n");
		service.printEmployee("Engineer");

		System.out.println("\n============ Secretary list ============\n");
		service.printEmployee("Secretary");
		
		System.out.println("\n============ 2. DeleteEmployee(Manager AAA 삭제) ============\n");
		service.deleteEmployee("AAA");
		
		System.out.println("\n============ Manager list(Manager AAA 삭제 후) ============\n");
		service.printEmployee("Manager");
//
//		System.out.println("\n============ 3. updateManager(CCC 연봉 수정 20000->35000) ============\n");
//		service.updateEmployee(new Manager("CCC", new MyDate(1980, 3, 3), 35000.0, "교육부", 30));
	
		System.out.println("\n============ Manager list ============\n");
		service.printEmployee("ALL");
//		
//		System.out.println("\n============ 4. findManager(BBB) ============\n ");
//		service.findManager("BBB");
//		
//		System.out.println("\n============ 4. findManager(10) ============\n ");
//		System.out.println(">>>>10번 부서에 근무하는 직원들 입니다.");
//		service.findManager(10);
//		
//		System.out.println("\n============ 4. findEngineer(EEE) ============\n ");
//		service.findEngineer("EEE");
//		
//		//급여 정보 확인 직군별 총 급여 & 평균 급여
//		System.out.println("\n============ 5. Salary Information ============\n ");
//		service.salaryInfoManagers();
//		System.out.println();
//		service.salaryInfoEngineers();
//		
//		//싱글톤 활용...
//		System.out.println("\n============ 6. Register Groupware ============\n ");
//		EmployeeService.getInstance().register("CCC");
//		EmployeeService.getInstance().register("DDD");
//		EmployeeService.getInstance().register("EEE");
//		
	}
}









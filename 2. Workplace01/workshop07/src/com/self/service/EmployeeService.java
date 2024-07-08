/**
 * @author Heejulee
 * @version 2.0
 */
package com.self.service;

import com.self.parent.Employee;
import com.self.test.EmployeeServiceTest;
import com.self.vo.Engineer;
import com.self.vo.Manager;
import com.self.vo.Secretary;

public class EmployeeService {
	
	Employee[] emps;
	int idx = 0;
	
	//singleton 
	private static EmployeeService esvc = new EmployeeService();
	private EmployeeService() {}
	public static EmployeeService getInstance() {
		return esvc;
	}	

	public EmployeeService(int size){
		emps = new Employee[size];
	}

	/**
	 * @param Manager 직원을 추가하는 기능
	 * @return 추가된 결과
	 */
	public void addEmployee(Employee e) {	
		emps[idx++]= e;
		System.out.println(">>>>"+e.getName()+"님 정보가 성공적으로 저장되었습니다.");
	}
	
	/**
	 * @param 각 파트별 정보를 출력하는 기능
	 * @return 파트별 정보
	 */
	public void printEmployee(String section) {

		for(Employee employee : emps) {
			int idx = 0;
			
			if(section.equals("Manager")) {
				if(emps==null) continue;
				if(employee instanceof Manager) {
					emps[idx]= employee;
					System.out.println(((Manager) employee).toString());
				}
			}
			if(section.equals("Engineer")) {
				if(employee instanceof Engineer) {
					emps[idx]= employee;
					System.out.println(((Engineer) employee).toString());
				}
			}
			if(section.equals("Secretary")) {
				if(employee instanceof Secretary) {
					emps[idx]= employee;
					System.out.println(((Secretary) employee).toString());
				}
			}
			if(section.equals("ALL")) {
				emps[idx]=employee;
				if(employee!=null) System.out.println(employee.toString());
			}
		}
	}
	
	/**
	 * @param 해당하는 사원명을 입력해 정보를 삭제하는 기능
	 * @return 정보를 삭제
	 */
	public void deleteEmployee(String name) {	
		for(int i = 0; i<emps.length; i++) {
			if(emps[i] !=null && emps[i].getName().equals(name)) {
				for(int j = i; j<emps.length -1; j++) {
					emps[j] = emps[j+1];//한칸 당겨 덮어쓰기
				}
				emps[emps.length-1]= null;
				break;
			};
		}System.out.println(">>>>"+name+"님의 정보가 삭제되었습니다.");
	}
	
//	/**
//	 * @param 입력된 정보를 수정하는 기능
//	 * @return 정보를 수정
//	 */
//	public void updateEmployee(Employee e) {
//		boolean updated = false;
//		
//			if(emps.equals(e.getName())){
//				e.changeSalary(e);
//				updated = true;
//			}
//			if (updated) {
//			System.out.println(">>>>"+e.getName()+"님의 정보가 업데이트되었습니다.");
//			}
//			else {System.out.println("업데이트할 관리자를 찾지 못했습니다.");
//			}//else
//        }
				
				//					e1.changeSalary(e1.changeSalary());
//					((Manager)e1).changeDept((Manager)e1).changeDept());
//					((Manager)e1).changeDeptno(changeDeptno);
//					updated = true;
//				}
//			}

			
//
//	public Manager findManager(String name) {
//		System.out.println(">>>>검색하신 "+name+"님의 정보입니다.");
//		for(Manager manager : ms) {
//			if(manager==null) continue;//
//			if(manager.getName().equals(name)) { 
//				System.out.println(manager.getDetails()); //찾으면 반환
//				return manager;
//			}
//		}return null;//못찾으면 반환X
//	}
////	}
//	public Manager[ ] findManager(int deptno) {
//		Manager[ ] temp = new Manager[ms.length];
//		int midx = 0;
//		
//		for(Manager manager : ms) {
//			if(manager==null) continue;//
//			if(manager.getDeptno()== deptno) { 
//				temp[midx++] =manager;
//				System.out.println(manager.getDetails()); //찾으면 반환
//				}
//			}
//		return null;
//	}
//	
//	public Engineer findEngineer(String name) {
//		System.out.println(">>>>검색하신 "+name+"님의 정보입니다.");
//		for(Engineer engineer : egs) {
//			if(engineer==null) continue;//
//			if(engineer.getName().equals(name)) { 
//				System.out.println(engineer.getDetails()); //찾으면 반환
//				return engineer;
//			}
//		}return null;//못찾으면 반환X
//	}


//	//관리직원 총 평균 급여 산출
//	public void salaryInfoManagers() {
//		double totalSalary = 0;	
//		double averageSalary = 0;
//		int midx = 0;
//		
//		 for (Manager manager : ms) {
//	        	midx++;//반복되면 +1
//		        if (manager != null) {
//		            totalSalary += manager.getSalary();
//		            averageSalary = totalSalary/midx;
//		        }
//		 }
//		 System.out.println(">>>>Manager 총 급여 : "+totalSalary);
//		 System.out.println(">>>>Manager 평균 급여 : "+Math.round(averageSalary* 10.0) / 10.0);//소수점 첫째자리까지
//	}
//	
//	//엔지니어 총 평균 급여 산출
//	public void salaryInfoEngineers() {
//		double totalSalary = 0;	
//		double averageSalary = 0;
//		int eidx = 0;
//		
//		 for (Engineer engineer : egs) {
//	        	eidx++;//반복되면 +1
//		        if (engineer != null) {
//		            totalSalary += engineer.getSalary();
//		            averageSalary = totalSalary/eidx;
//		        }
//		 }
//		 System.out.println(">>>>Engineer 총 급여 : "+totalSalary);
//		 System.out.println(">>>>Engineer 평균 급여 : "+Math.round(averageSalary* 10.0) / 10.0);
//	}
//	
	//직원 등록 여부 확인(싱글톤 활용하기)
	public void register(String name) {
		System.out.println(name+"님의 그룹웨어 가입이 완료되었습니다.");
	}
}





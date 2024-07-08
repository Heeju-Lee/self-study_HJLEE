package com.self.service;

import com.self.vo.Engineer;
import com.self.vo.Manager;

public class EmployeeService {
	Manager[ ] ms;
	int midx;
	
	Engineer[ ] egs;
	int egidx;	

	public EmployeeService(int size){
		ms = new Manager[size];
		egs = new Engineer[size];
	}
	public void addManager(Manager m) {	
		ms[midx++] = m;
		System.out.println("===추가된 관리자의 정보는 아래와 같습니다.===");
		System.out.println(m.getDetails());
	}
	public void addEngineer(Engineer eg) {	
		egs[egidx++] = eg;
		System.out.println("===추가된 엔지니어의 정보는 아래와 같습니다.===");
		System.out.println(eg.getDetails());
	}
	public void deleteManager(String name) {	
		for(int i = 0; i<ms.length; i++) {
			if(ms[i] !=null && ms[i].getName().equals(name)) {
				for(int j = i; j<ms.length -1; j++) {
					ms[j] =ms[j+1];
				}
				ms[ms.length-1]= null;
				break;
			}
		}
	}
	public void deleteEngineer(String name) {
		//
	}
	public void updateManager(Manager m) {	
		//
	}
	public void updateEngineer(Engineer eg) {	
		//
	}	
	//Method Overloading
	/*
	 * 하는일은 똑같은데...처리하는 데이타를 달리할때 쓰는 기법
	 * 메소드의 통일감을 강조하면서도 서로다른 데이타를 처리할수 있게끔 해준.다.
	 */
	public Manager findManager(String name) {

		return null;
	}
	public Manager[ ] findManager(int deptno) {
		Manager[ ] temp = new Manager[ms.length];
		//
		
		return temp;
	}
	public Engineer findEngineer(String name) {
		Engineer eg = null;
		//
		
		return eg;
	}	
	//매니저 정보확인 메소드
	public void printManagers() {
		for(Manager managers : ms) {
			if(managers==null) continue;		
			else {
				System.out.println(managers.getDetails());
			}
		}
	}
	//엔지니어 정보확인 메소드
	public void printEngineers() {
		for(Engineer engineers : egs) {
			if(engineers==null) continue;		
			else {
				System.out.println(engineers.getDetails());
			}
		}
	}
}



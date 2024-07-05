package com.edu.test;

import com.edu.child.Manager;
import com.edu.util.MyDate;

public class InheritanceTest1 {

	public static void main(String[] args) {
		//자식 클래스 생성
		Manager m = new Manager("James", 30000.0, new MyDate(1999, 1, 1), "IT");
		System.out.println(m.getDetails());
		
	}
}

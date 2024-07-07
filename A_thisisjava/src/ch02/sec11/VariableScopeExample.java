package ch02.sec11;

public class VariableScopeExample {

	public static void main(String[] args) {
		int v1 = 1;
		System.out.println("v1: " + v1);

		if(v1>10) {
			int v2 = v1 - 10;
			System.out.println(v2);
		} 
		/*
		 * int v3 = v1 + v2 + 5;//v2는 if블록에서 선언됨. 그래서 컴파일에서
		 */
		int v3 = v1 + 5;
		
		System.out.println("======78p 확인문제=====");
		
		if(true) {
			int v2 = 2;
			if(true) {
				int v4 = 2;
				System.out.println("v1: " + v1);
				System.out.println("v2: " + v2);
				System.out.println("v4: " + v4);
			}
			System.out.println("v1: " + v1);
			System.out.println("v2: " + v2);
			//System.out.println("v4: " + v4);//컴파일오류
		}
		System.out.println("v1: " + v1);
		//System.out.println("v2: " + v2);컴파일 오류

	}

}

package com.edu.self.workshop03;

import java.util.Scanner;

public class BackwardsNumberTest {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		do{
			System.out.print("1이상의 숫자를 입력하세요: ");
			int input = sc.nextInt();
			
			if(input>1) {
				while(input>=1) {
					System.out.print(input--+"\t");
				}break;
			}else {
				System.out.print("1이상의 숫자를 입력해주세요.\n");
			}
		}while(true) ;//true 이면 do{} 반복 false면 종료
		
	}

}

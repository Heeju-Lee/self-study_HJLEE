package ch03.sec05;

public class InfinityAndNaNCheckExample {

	public static void main(String[] args) {
		int x = 5; 
		double y = 0.0;
		double z = x / y;
		double z1 = x % y;
		
		//잘못된 코드
		System.out.println(z + 2);
		System.out.println(z1 + 2);
		
		//알맞은 코드
		
		if(Double.isInfinite(z)||Double.isNaN(z)) {
			System.out.println("z값을 산출할 수 없습니다.");
		}else {
			System.out.println( z + 2 );
		}
		
		if(Double.isInfinite(z1)||Double.isNaN(z1)) {
			System.out.println("z1값을 산출할 수 없습니다.");
		}else {
			System.out.println( z1 + 2 );
		}

	}

}

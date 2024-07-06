package ch02.sec02;

public class LongExample {

	public static void main(String[] args) {
		long var1 =10;
		long var2 =10l;
		long var3 =2147483648l;//int범위를 벗어나면 컴파일러는 int로 간주하기 때문에 에러 발생
		long var4 =1000000000000l;//l or L 붙여주기
		
		System.out.println(var1);
		System.out.println(var2);
		System.out.println(var3);
		System.out.println(var4);
		
	}

}

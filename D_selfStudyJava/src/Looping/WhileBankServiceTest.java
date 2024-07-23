package Looping;//혼공자 p183 7번
import java.util.Scanner;


public class WhileBankServiceTest {
    public static void main(String[] args) {
        boolean run = true;
        int balance = 0;
        int amt;

        Scanner sc = new Scanner(System.in);

        outter : while(run){
            System.out.println("----------------------------------");
            System.out.println("1. 예금 | 2. 출금 | 3. 잔고 | 4. 종료");
            System.out.println("----------------------------------");
            System.out.print("선택>");

            int number = sc.nextInt();
            sc.nextLine();
            switch(number){
                case 1:
                    System.out.print("예금액>");
                    amt = sc.nextInt();
                    sc.nextLine();
                    balance += amt;
                    break;
                case 2:
                    System.out.print("출금액>");
                    amt = sc.nextInt();
                    sc.nextLine();
                    balance -= amt;
                    break;
                case 3:
                    System.out.print("잔고>"+balance+"\n");
                    break;
                case 4:
                    System.out.println("프로그램 종료");
                    break outter;
                default:
                    System.out.println("잘못 입력하였습니다. 다시입력해주세요.");
            }
        }
    }
}

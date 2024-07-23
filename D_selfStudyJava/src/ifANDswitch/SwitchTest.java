package ifANDswitch;//혼공자 p169 4번
import java.util.Scanner;

public class SwitchTest {
    public static void main(String[] args) {//psvm 탭
        Scanner sc = new Scanner(System.in);

        System.out.println("어떤 혜택을 원하세요?");
        String grade;
        grade = sc.next();

        switch (grade){
            case "A" :
                System.out.println("VVIP 혜택을 받으실 수 있습니다.");break;
            case "B" :
                System.out.println("VIP 혜택을 받으실 수 있습니다.");break;
            case "C" :
                System.out.println("우수 혜택을 받으실 수 있습니다.");break;
            case "D" :
                System.out.println("일반 혜택을 받으실 수 있습니다.");break;
            default:  System.out.println("혜택이 없습니다.");
        }
        System.out.println("감사합니다.");
    }
}

package ifANDswitch;

//혼공자 p169 3번
public class IfTest {
    public static void main(String[] args) {
        int score = 85;

        System.out.println("등급은 ");
        if (score < 70) {
            System.out.println("D");
        } else if (score < 80) {
            System.out.println("C");
        } else if (score < 90) {
            System.out.println("B");
        } else {
            System.out.println("A");
        }
        System.out.println(" 입니다.");
    }
}
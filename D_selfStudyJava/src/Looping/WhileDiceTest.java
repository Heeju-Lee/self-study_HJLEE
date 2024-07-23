package Looping;

//혼공자 p183 3번
public class WhileDiceTest {
    public static void main(String[] args) {

        boolean result =true;

        System.out.println("             [Game Start]              ");
        System.out.println("[주사위는 합이 5가 될 때까지 계속 돌아갑니다.]");
        System.out.println("==========================================");

        while(result){
            int dice1 = (int) (Math.random()*6)+1;
            int dice2 = (int) (Math.random()*6)+1;
            int sum = dice1+dice2;

            if(sum==5){
                System.out.println("첫번째 주사위:"+dice1+" | 두번째 주사위:"+dice2);
                System.out.println("합이 5가 나왔네요 짝짝짝!!^^ \n게임이 종료됩니다.");
                System.out.println("==========================================");
                result=false;
            }else{
                System.out.println("첫번째 주사위:"+dice1+" | 두번째 주사위:"+dice2);
                System.out.println("합이 5가 나올때까지 계속 진행됩니다.");
                System.out.println("==========================================");
            }

        }
    }
}

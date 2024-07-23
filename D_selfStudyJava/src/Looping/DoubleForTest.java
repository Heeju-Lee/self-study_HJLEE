package Looping;

//혼공자 p183 4번
public class DoubleForTest {
    public static void main(String[] args) {
        int result = 60;

        for(int x=1;x<=10;x++){
            for(int y=1;y<=10;y++){
                if(result == 4 * x + 5 * y){
                    System.out.println("("+x+","+y+")");
                }
            }
        }
    }
}

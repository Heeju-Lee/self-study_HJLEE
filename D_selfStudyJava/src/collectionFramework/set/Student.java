package collectionFramework.set;

public class Student {
    public int studentNum;
    public String name;

    public Student(int studentNum, String name) {
        this.studentNum = studentNum;
        this.name = name;
    }
    @Override
    public int hashCode(){
        return studentNum;//궁금한 점 studentNum.hashCode 가 왜안되는건지....
    }

    @Override
    public boolean equals(Object obj){
        if(obj instanceof Student){
            Student student = (Student) obj;
            return student.studentNum==studentNum;
        }else {
            return false;
        }

    }


}

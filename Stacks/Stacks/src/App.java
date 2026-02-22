public class App {
    public static void main(String[] args) throws Exception {
        testingStack();
    }

    public static void testingStack() {
        Stack stack = new Stack();

        stack.push(10);
        stack.push(30);
        stack.push(20);

        stack.display();

        System.out.println("Valor de cabeza: " + stack.peek());
        System.out.println("Elemento removido: " + stack.pop());

        stack.display();
    }
}

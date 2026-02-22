public class App {
    public static void main(String[] args) throws Exception {
        testingSortedList();
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

    public static void testingQueue() {
        Queue queue = new Queue();

        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        queue.display();

        queue.dequeue();
        queue.display();
    }

    public static void testingSortedList() {
        SortedList list = new SortedList();

        list.insert(30);
        list.insert(10);
        list.insert(20);
        list.insert(5);

        list.display();
    }
}

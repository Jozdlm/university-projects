public class Stack {
    private Node top;

    public Stack() {
        this.top = null;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public void push(int value) {
        Node newNode = new Node(value);
        newNode.next = top;
        top = newNode;
        System.out.println(value + " Agregado a la lista");
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Lista sin elementos");
            return -1;
        }

        int popped = top.value;
        top = top.next;
        return popped;
    }

    public int peek() {
        if (isEmpty()) {
            System.out.println("La lista esta vacia!");
            return -1;
        }

        return top.value;
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("La lista esta vacia!");
            return;
        }

        System.out.println("Elementos de la lista:");
        Node temp = top;
        while (temp != null) {
            System.out.println(temp.value);
            temp = temp.next;
        }
    }
}

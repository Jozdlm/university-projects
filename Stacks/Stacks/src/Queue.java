public class Queue {
    private Node front;
    private Node rear;

    public Queue() {
        this.front = null;
        this.rear = null;
    }

    public void enqueue(int value) {
        Node newNode = new Node(value);

        if (isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }

        System.out.println(value + " Agregado a la cola");
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("La cola esta vacia");
            return -1;
        }

        int removed = front.value;
        front = front.next;

        if (front == null) {
            rear = null;
        }

        return removed;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public void display() {
        Node temp = front;
        while (temp != null) {
            System.out.print(temp.value + " -> ");
            temp = temp.next;
        }
        System.out.println();
    }
}

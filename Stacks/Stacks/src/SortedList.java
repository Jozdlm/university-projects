public class SortedList {
    private Node head;

    public SortedList() {
        head = null;
    }

    public void insert(int value) {
        Node newNode = new Node(value);

        if (head == null || value <= head.value) {
            newNode.next = head;
            head = newNode;
            return;
        }

        Node current = head;
        while (current.next != null && current.next.value < value) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
    }

    public void display() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.value + " -> ");
            temp = temp.next;
        }
        System.out.println();
    }
}

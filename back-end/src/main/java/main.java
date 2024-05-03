import java.util.concurrent.atomic.AtomicInteger;

public class main {
    private static final String PREFIX = "FSM";
    private static final int ID_LENGTH = 5;
    private static final String FORMAT = "%s%0" + ID_LENGTH + "d";
    private static AtomicInteger counter = new AtomicInteger(1);

    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            System.out.println(generateID());
        }
    }


    public static String generateID() {
        int id = counter.getAndIncrement();
        return String.format(FORMAT, PREFIX, id);
    }

    // Reset counter (useful for testing)
    public static void resetCounter() {
        counter.set(1);
    }
}


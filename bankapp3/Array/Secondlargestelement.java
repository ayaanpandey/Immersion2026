import java.util.Scanner;

public class Secondlargestelement {
    public static int secondLargest(int[] arr) {
        if (arr == null || arr.length < 2) {
            throw new IllegalArgumentException("Array must contain at least two elements.");
        }

        int largest = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        boolean foundSecond = false;

        for (int value : arr) {
            if (value > largest) {
                if (largest != Integer.MIN_VALUE || foundSecond) {
                    second = largest;
                    foundSecond = true;
                }
                largest = value;
            } else if (value != largest && value > second) {
                second = value;
                foundSecond = true;
            }
        }

        if (!foundSecond) {
            throw new IllegalArgumentException("No second largest element found.");
        }

        return second;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter array size:");
        int n = scanner.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter " + n + " array elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }

        try {
            int result = secondLargest(arr);
            System.out.println("Second largest value: " + result);
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
        }

        scanner.close();
    }
}

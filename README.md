package com.javatechie.spring.batch.test;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.ZonedDateTime;

//@Component
public class MyScheduler {

    public static void main(String[] args) {
        myScheduledTask();

    }

    //@Scheduled(cron = "0 0 0,6,12,18 * * *") // Run every day at 12am, 6am, 12pm, and 6pm
    public static void myScheduledTask() {
        // Step 1: Get the current time
        LocalTime currentTime = LocalTime.now();

        // Step 2: Determine which cycle the current time falls into
        int currentCycle = getCurrentCycle(currentTime);

        // Step 3: Subtract one cycle to get the previous cycle
        int previousCycle = (currentCycle - 2 + 4) % 4 + 1;

        // Now you have the previous cycle, and you can use it as needed
        System.out.println("Current Cycle: " + currentCycle);
        System.out.println("Previous Cycle: " + previousCycle);
    }

    private static int getCurrentCycle(LocalTime currentTime) {
        // Determine which cycle the current time falls into
        if (currentTime.isAfter(LocalTime.parse("00:00:00")) && currentTime.isBefore(LocalTime.parse("06:00:00"))) {
            return 1;
        } else if (currentTime.isAfter(LocalTime.parse("06:00:00")) && currentTime.isBefore(LocalTime.parse("12:00:00"))) {
            return 2;
        } else if (currentTime.isAfter(LocalTime.parse("12:00:00")) && currentTime.isBefore(LocalTime.parse("18:00:00"))) {
            return 3;
        } else {
            return 4;
        }
    }

}



////////////////////////

package com.javatechie.spring.batch.test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class CycleTimestamp {

    public static void main(String[] args) {
        int cycle = 4; // Change this to the desired cycle (1, 2, 3, or 4)
        LocalTime cycleStartTime = getCycleStartTime(cycle);
        LocalTime cycleEndTime = getCycleEndTime(cycle);
        LocalDateTime startTimestamp = getTimestampForCycle(cycle, cycleStartTime);
        LocalDateTime endTimestamp = getTimestampForCycle(cycle, cycleEndTime);
        System.out.println("startTimestamp: " + startTimestamp);
        System.out.println("endTimestamp: " + endTimestamp);
    }

    private static LocalDateTime getTimestampForCycle(int cycle, LocalTime cycleTime) {
        LocalDate currentDate = LocalDate.now();


        if (cycle == 4) {
            // Adjust date to the previous day for cycle 1
            currentDate = currentDate.minusDays(1);
        }

        return LocalDateTime.of(currentDate, cycleTime);
    }

    private static LocalTime getCycleStartTime(int cycle) {
        switch (cycle) {
            case 1:
                return LocalTime.parse("00:00:00");
            case 2:
                return LocalTime.parse("06:00:00");
            case 3:
                return LocalTime.parse("12:00:00");
            case 4:
                return LocalTime.parse("18:00:00");
            default:
                throw new IllegalArgumentException("Invalid cycle number: " + cycle);
        }
    }

    private static LocalTime getCycleEndTime(int cycle) {
        switch (cycle) {
            case 1:
                return LocalTime.parse("05:59:59");
            case 2:
                return LocalTime.parse("11:59:59");
            case 3:
                return LocalTime.parse("17:59:59");
            case 4:
                return LocalTime.parse("23:59:59");
            default:
                throw new IllegalArgumentException("Invalid cycle number: " + cycle);
        }
    }
}

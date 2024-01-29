import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CycleTimestampTest {

    @Test
    public void testGetTimestampForCycle() {
        // Prepare test data
        LocalDate currentDate = LocalDate.of(2024, 1, 29); // Assuming the current date is January 29, 2024
        LocalTime cycleTime = LocalTime.of(12, 0, 0); // Cycle time at noon
        CycleTimestamp cycleTimestamp = new CycleTimestamp();

        // Test for cycle 1 (no adjustment)
        LocalDateTime timestampForCycle1 = cycleTimestamp.getTimestampForCycle(1, cycleTime);
        LocalDateTime expectedTimestampForCycle1 = LocalDateTime.of(currentDate, cycleTime);
        assertEquals(expectedTimestampForCycle1, timestampForCycle1);

        // Test for cycle 4 (adjust date to the previous day)
        LocalDateTime timestampForCycle4 = cycleTimestamp.getTimestampForCycle(4, cycleTime);
        LocalDate expectedDateForCycle4 = currentDate.minusDays(1);
        LocalDateTime expectedTimestampForCycle4 = LocalDateTime.of(expectedDateForCycle4, cycleTime);
        assertEquals(expectedTimestampForCycle4, timestampForCycle4);
    }
}

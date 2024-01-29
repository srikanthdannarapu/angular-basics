
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CycleTimestampTest {

    @Mock
    private CycleTimeProperties cycleTimeProperties;

    @Test
    public void testGetCycleStartTime() {
        CycleTimestamp cycleTimestamp = new CycleTimestamp();
        cycleTimestamp.setCycleTimeProperties(cycleTimeProperties);

        when(cycleTimeProperties.getStartTime()).thenReturn(Map.of(
                1, "00:00:00",
                2, "06:00:00",
                3, "12:00:00",
                4, "18:00:00"
        ));

        assertEquals(LocalTime.parse("00:00:00"), cycleTimestamp.getCycleStartTime(1));
        assertEquals(LocalTime.parse("06:00:00"), cycleTimestamp.getCycleStartTime(2));
        assertEquals(LocalTime.parse("12:00:00"), cycleTimestamp.getCycleStartTime(3));
        assertEquals(LocalTime.parse("18:00:00"), cycleTimestamp.getCycleStartTime(4));
    }

    @Test
    public void testGetCycleEndTime() {
        CycleTimestamp cycleTimestamp = new CycleTimestamp();
        cycleTimestamp.setCycleTimeProperties(cycleTimeProperties);

        when(cycleTimeProperties.getEndTime()).thenReturn(Map.of(
                1, "05:59:59",
                2, "11:59:59",
                3, "17:59:59",
                4, "23:59:59"
        ));

        assertEquals(LocalTime.parse("05:59:59"), cycleTimestamp.getCycleEndTime(1));
        assertEquals(LocalTime.parse("11:59:59"), cycleTimestamp.getCycleEndTime(2));
        assertEquals(LocalTime.parse("17:59:59"), cycleTimestamp.getCycleEndTime(3));
        assertEquals(LocalTime.parse("23:59:59"), cycleTimestamp.getCycleEndTime(4));
    }

    @Test
    public void testGetCurrentCycle() {
        CycleTimestamp cycleTimestamp = new CycleTimestamp();
        cycleTimestamp.setCycleTimeProperties(cycleTimeProperties);

        when(cycleTimeProperties.getStartTime()).thenReturn(Map.of(
                1, "00:00:00",
                2, "06:00:00",
                3, "12:00:00",
                4, "18:00:00"
        ));

        when(cycleTimeProperties.getEndTime()).thenReturn(Map.of(
                1, "05:59:59",
                2, "11:59:59",
                3, "17:59:59",
                4, "23:59:59"
        ));

        assertEquals(1, cycleTimestamp.getCurrentCycle(LocalTime.parse("03:00:00")));
        assertEquals(2, cycleTimestamp.getCurrentCycle(LocalTime.parse("07:00:00")));
        assertEquals(3, cycleTimestamp.getCurrentCycle(LocalTime.parse("13:00:00")));
        assertEquals(4, cycleTimestamp.getCurrentCycle(LocalTime.parse("19:00:00")));
    }
}

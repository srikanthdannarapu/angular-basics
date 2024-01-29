cycleTimes:
  startTime:
    1: "00:00:00"
    2: "06:00:00"
    3: "12:00:00"
    4: "18:00:00"
  endTime:
    1: "05:59:59"
    2: "11:59:59"
    3: "17:59:59"
    4: "23:59:59"


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "cycleTimes")
public class CycleTimeProperties {

    private Map<Integer, String> startTime;
    private Map<Integer, String> endTime;

    public Map<Integer, String> getStartTime() {
        return startTime;
    }

    public void setStartTime(Map<Integer, String> startTime) {
        this.startTime = startTime;
    }

    public Map<Integer, String> getEndTime() {
        return endTime;
    }

    public void setEndTime(Map<Integer, String> endTime) {
        this.endTime = endTime;
    }
}



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class CycleTimestamp {

    @Autowired
    private CycleTimeProperties cycleTimeProperties;

    private LocalDateTime getTimestampForCycle(int cycle, LocalTime cycleTime) {
        LocalDate currentDate = LocalDate.now();

        if (cycle == 4) {
            // Adjust date to the previous day for cycle 1
            currentDate = currentDate.minusDays(1);
        }

        return LocalDateTime.of(currentDate, cycleTime);
    }

    private LocalTime getCycleStartTime(int cycle) {
        return LocalTime.parse(cycleTimeProperties.getStartTime().get(cycle));
    }

    private LocalTime getCycleEndTime(int cycle) {
        return LocalTime.parse(cycleTimeProperties.getEndTime().get(cycle));
    }
    
    private int getCurrentCycle(LocalTime currentTime) {
        // Determine which cycle the current time falls into
        if (currentTime.isAfter(LocalTime.parse(cycleTimeProperties.getStartTime().get(1))) && currentTime.isBefore(LocalTime.parse(cycleTimeProperties.getStartTime().get(2)))) {
            return 1;
        } else if (currentTime.isAfter(LocalTime.parse(cycleTimeProperties.getStartTime().get(2))) && currentTime.isBefore(LocalTime.parse(cycleTimeProperties.getStartTime().get(3)))) {
            return 2;
        } else if (currentTime.isAfter(LocalTime.parse(cycleTimeProperties.getStartTime().get(3))) && currentTime.isBefore(LocalTime.parse(cycleTimeProperties.getStartTime().get(4)))) {
            return 3;
        } else {
            return 4;
        }
    }
}


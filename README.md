import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.core.io.FileSystemResource;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CsvItemWriterTest {

    @Mock
    private StepExecution stepExecution;

    private CsvItemWriter csvItemWriter;

    @BeforeEach
    void setUp() {
        csvItemWriter = new CsvItemWriter();
        csvItemWriter.beforeStep(stepExecution);
    }

    @Test
    void testWrite() throws Exception {
        // Given
        FlatFileItemWriter<Customer> csvWriter = csvItemWriter.getCsvWriter();
        csvItemWriter.csvWriter = csvWriter;
        List<Customer> customers = Arrays.asList(
                new Customer(1, "John", "Doe", "john@example.com", "Male", "1234567890", "USA", "1990-01-01"),
                new Customer(2, "Jane", "Doe", "jane@example.com", "Female", "0987654321", "UK", "1995-05-05")
        );

        // When
        csvItemWriter.write(customers);

        // Then
        Mockito.verify(csvWriter, Mockito.times(1)).open(any());
        Mockito.verify(csvWriter, Mockito.times(1)).write(customers);
    }

    @Test
    void testCloseWriter() throws Exception {
        // Given
        FlatFileItemWriter<Customer> csvWriter = mock(FlatFileItemWriter.class);
        csvItemWriter.csvWriter = csvWriter;
        csvItemWriter.isWriterOpen = true;

        // When
        csvItemWriter.closeWriter();

        // Then
        Mockito.verify(csvWriter, Mockito.times(1)).setFooterCallback(any());
        Mockito.verify(csvWriter, Mockito.times(1)).close();
    }

    @Test
    void testBeforeStep() {
        // Given
        JobParameters jobParameters = new JobParametersBuilder()
                .addString("fileTypesToGenerateReport", "csv")
                .toJobParameters();
        when(stepExecution.getJobParameters()).thenReturn(jobParameters);

        // When
        csvItemWriter.beforeStep(stepExecution);

        // Then
        assertEquals("csv", csvItemWriter.prefix);
        assertEquals(true, csvItemWriter.csvWriter != null);
    }

    @Test
    void testAfterStep() {
        // When
        ExitStatus exitStatus = csvItemWriter.afterStep(stepExecution);

        // Then
        assertEquals(ExitStatus.COMPLETED, exitStatus);
    }
}


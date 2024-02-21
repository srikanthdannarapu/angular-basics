import com.javatechie.spring.batch.entity.Customer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.file.transform.LineAggregator;
import org.springframework.core.io.FileSystemResource;
import org.springframework.util.Assert;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CsvItemWriterTest {

    private CsvItemWriter csvItemWriter;
    private StepExecution stepExecution;
    private JobParameters jobParameters;
    private JobExecution jobExecution;

    @BeforeEach
    void setUp() {
        csvItemWriter = new CsvItemWriter();
        stepExecution = mock(StepExecution.class);
        jobParameters = mock(JobParameters.class);
        jobExecution = mock(JobExecution.class);
        when(stepExecution.getJobParameters()).thenReturn(jobParameters);
        when(stepExecution.getJobExecution()).thenReturn(jobExecution);
    }

    @Test
    void testWriteHeaderAndFooterCallbacks() throws Exception {
        Path tempDir = Files.createTempDirectory("test");
        String outputPath = tempDir.resolve("customer_output.csv").toString();

        // Set up job parameters
        when(jobParameters.getString("fileTypesToGenerateReport")).thenReturn("csv");

        // Set up mock job execution
        when(jobExecution.getExecutionContext()).thenReturn(new ExecutionContext());

        // Set up step execution
        when(stepExecution.getExecutionContext()).thenReturn(new ExecutionContext());

        // Set up step execution context
        ExecutionContext stepExecutionContext = new ExecutionContext();
        when(stepExecution.getExecutionContext()).thenReturn(stepExecutionContext);

        // Mock the writer
        FlatFileItemWriter<Customer> csvWriter = csvItemWriter.getCsvWriter();
        csvWriter.setResource(new FileSystemResource(outputPath));
        csvWriter.setLineAggregator(new CustomerLineAggregator());
        csvWriter.afterPropertiesSet(); // Needed to initialize the writer

        csvItemWriter.beforeStep(stepExecution);

        // Generate test data
        List<Customer> customers = new ArrayList<>();
        customers.add(new Customer(1L, "John", "Doe", "john.doe@example.com", "Male", "1234567890", "USA", "1990-01-01"));

        // Write test data
        csvItemWriter.write(customers);

        // Close the writer
        csvItemWriter.closeWriter();

        // Verify header
        List<String> lines = Files.readAllLines(tempDir.resolve("customer_output.csv"));
        Assert.isTrue(lines.get(0).equals("id,firstName,lastName,email,gender,contactNo,country,dob"), "Header line does not match.");

        // Verify footer
        Assert.isTrue(lines.get(lines.size() - 1).equals("Total,1"), "Footer line does not match.");
    }

    @AfterEach
    void tearDown() {
        csvItemWriter = null;
        stepExecution = null;
        jobParameters = null;
        jobExecution = null;
    }
}

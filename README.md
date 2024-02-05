import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.item.ExecutionContext;

import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExcelItemWriterTest {

    @Mock
    private StepExecution stepExecution;

    private ExcelItemWriter excelItemWriter;

    @BeforeEach
    void setUp() {
        excelItemWriter = new ExcelItemWriter();
    }

    @Test
    void testBeforeStep_ExcelFile() {
        // Given
        JobParameters jobParameters = new JobParametersBuilder()
                .addString("fileTypesToGenerateReport", "excel")
                .toJobParameters();
        when(stepExecution.getJobParameters()).thenReturn(jobParameters);

        // When
        excelItemWriter.beforeStep(stepExecution);

        // Then
        assertNotNull(excelItemWriter.workbook);
        assertNotNull(excelItemWriter.sheet);
        assertEquals("Customers", excelItemWriter.sheet.getSheetName());
    }

    @Test
    void testWrite_ExcelFile() throws Exception {
        // Given
        excelItemWriter.workbook = Mockito.mock(Workbook.class);
        excelItemWriter.sheet = Mockito.mock(Sheet.class);
        excelItemWriter.fileTypesToGenerateReport = "excel";
        excelItemWriter.totalLinesWritten = 0;
        Customer customer = new Customer(1, "John", "Doe", "john@example.com", "Male", "1234567890", "USA", "1990-01-01");

        // When
        excelItemWriter.write(Collections.singletonList(customer));

        // Then
        verify(excelItemWriter.sheet, times(1)).createRow(1); // Row creation for customer
        verify(excelItemWriter.workbook, times(1)).write(any(FileOutputStream.class)); // Workbook write
        assertEquals(1, excelItemWriter.getTotalLinesWritten());
    }

    @Test
    void testAfterStep_ExcelFile() throws Exception {
        // Given
        excelItemWriter.workbook = Mockito.mock(Workbook.class);
        excelItemWriter.sheet = Mockito.mock(Sheet.class);
        excelItemWriter.fileTypesToGenerateReport = "excel";
        excelItemWriter.totalLinesWritten = 10;

        // When
        ExitStatus exitStatus = excelItemWriter.afterStep(stepExecution);

        // Then
        verify(excelItemWriter.workbook, times(1)).close(); // Workbook close
        assertEquals(ExitStatus.COMPLETED, exitStatus);
    }
}

import org.junit.jupiter.api.Test;
import org.mockito.MockedConstruction;
import org.mockito.Mockito;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;

import java.io.IOException;
import java.io.OutputStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ExcelItemWriterTest {

    @Test
    void testAfterStep_IOException() throws Exception {
        // Given
        ExcelItemWriter excelItemWriter = new ExcelItemWriter();
        excelItemWriter.workbook = Mockito.mock(Workbook.class);
        excelItemWriter.sheet = Mockito.mock(Sheet.class);
        excelItemWriter.fileTypesToGenerateReport = "excel";
        excelItemWriter.totalLinesWritten = 10;

        // Mock the behavior of workbook.write(any(FileOutputStream.class)) to throw an IOException
        try (MockedConstruction<FileOutputStream> mocked = Mockito.mockConstruction(FileOutputStream.class,
                (mock, context) -> {
                    doThrow(new IOException()).when(excelItemWriter.workbook).write(mock);
                })) {

            // When
            ExitStatus exitStatus = excelItemWriter.afterStep(mock(StepExecution.class));

            // Then
            assertEquals(ExitStatus.FAILED, exitStatus);
            verify(excelItemWriter.workbook, times(1)).close(); // Workbook close
        }
    }
}

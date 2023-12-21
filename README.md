public void write(List<? extends Customer> customers) throws Exception {
        try (FileOutputStream fileOut = new FileOutputStream(EXCEL_FILE_PATH)) {

            Sheet sheet = workbook.getSheet("Customers");
            // Header Row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("H");
            headerRow.createCell(1).setCellValue("Excel Report");

            int rowNum = 1;

            for (Customer customer : customers) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(customer.getId());
                row.createCell(1).setCellValue(customer.getFirstName());
                row.createCell(2).setCellValue(customer.getLastName());
                row.createCell(3).setCellValue(customer.getEmail());
                row.createCell(4).setCellValue(customer.getGender());
                row.createCell(5).setCellValue(customer.getContactNo());
                row.createCell(6).setCellValue(customer.getCountry());
                row.createCell(7).setCellValue(customer.getDob());
            }
            // Tail Row
            Row tailRow = sheet.createRow(rowNum);
            tailRow.createCell(0).setCellValue("T");
            tailRow.createCell(1).setCellValue(customers.size());

            workbook.write(fileOut);

        } catch (IOException e) {
            throw new RuntimeException("Error writing to XLSX file", e);
        }
    }

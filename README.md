public String getDataFromRemoteService(String param1, String param2, LocalDateTime param3) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = param3.format(formatter);

        String url = baseUrl + resourcePath
                .replace("{param1}", param1)
                .replace("{param2}", param2)
                .replace("{param3}", formattedDateTime);

        return restTemplate.getForObject(url, String.class);
    }

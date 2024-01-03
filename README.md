public String getDataFromRemoteService(String param1, String param2) {
        String url = baseUrl + "/resource";

        // Adding query parameters dynamically
        url = addQueryParam(url, "param1", param1);
        url = addQueryParam(url, "param2", param2);

        return restTemplate.getForObject(url, String.class);
    }

    private String addQueryParam(String url, String paramName, String paramValue) {
        return url + (url.contains("?") ? "&" : "?") + paramName + "=" + paramValue;
    }

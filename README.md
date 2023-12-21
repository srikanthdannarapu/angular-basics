import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@Component
public class RestApiItemReader implements ItemReader<Customer> {

    private final String apiUrl = "https://your-api-url/customers"; // Replace with your actual API endpoint

    private final RestTemplate restTemplate;
    private Iterator<Customer> customerIterator;

    public RestApiItemReader(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Customer read() throws Exception {
        if (customerIterator == null || !customerIterator.hasNext()) {
            initializeIterator();
        }

        return customerIterator.hasNext() ? customerIterator.next() : null;
    }

    private void initializeIterator() {
        Customer[] customersArray = restTemplate.getForObject(apiUrl, Customer[].class);
        List<Customer> customers = Arrays.asList(customersArray);
        customerIterator = customers.iterator();
    }
}

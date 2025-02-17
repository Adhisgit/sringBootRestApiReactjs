package com.test2.example.test2.service;


import com.test2.example.test2.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServices {

//    private final String API_URL = "https://reqres.in/api/users";
    private final String API_URL = "https://jsonplaceholder.typicode.com/todos";

    @Autowired
    private RestTemplate restTemplate;

    public List<User> getUsers(){
        User[] users = restTemplate.getForObject(API_URL,User[].class);
        return Arrays.asList(users);
    }
}

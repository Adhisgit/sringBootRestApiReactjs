package com.test2.example.test2.controller;


import com.test2.example.test2.entity.User;
import com.test2.example.test2.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@RestController
//@Controller

public class controler {

    @GetMapping("/")
    public String adhi() {
        return "add this endpint /products url to get products ";
    }

    @GetMapping("/adhi")
    public String aadhi() {
        return "itz me adhi";
    }

    @Autowired
    public UserServices userServices;

    @GetMapping("/api")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userServices.getUsers ();

        if (users.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}



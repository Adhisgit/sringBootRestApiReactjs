package com.test2.example.test2.entity;

import jakarta.persistence.Id;

public class User {

    private int userId;

    private int id;

    private String title;

    private String completed;

    public int getUserId() {
        return userId;
    }

    public int getId() {
        return id;
    }

    public String getCompleted() {
        return completed;
    }

    public String getTitle () {
        return title;


    }


}

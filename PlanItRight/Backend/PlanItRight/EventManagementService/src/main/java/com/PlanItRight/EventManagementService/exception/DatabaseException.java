package com.PlanItRight.EventManagementService.exception;

public class DatabaseException extends Exception{
    public DatabaseException(String s, Exception e) {
        super(s);
    }

    public DatabaseException(String s) {
    }
}

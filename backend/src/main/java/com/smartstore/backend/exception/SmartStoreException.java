package com.smartstore.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SmartStoreException extends RuntimeException {

    private final HttpStatus status;

    public SmartStoreException(
            String message,
            HttpStatus status) {

        super(message);
        this.status = status;
    }
}
package com.szedou.common.exception;

// Create this class in common/exception package
public class ApiClientException extends RuntimeException {
    public ApiClientException(String message) {
        super(message);
    }

    public ApiClientException(String message, Throwable cause) {
        super(message, cause);
    }
}
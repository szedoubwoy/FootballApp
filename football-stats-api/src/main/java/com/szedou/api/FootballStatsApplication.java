package com.szedou.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.szedou")
@EntityScan("com.szedou.domain")
public class FootballStatsApplication {
    public static void main(String[] args) {
        SpringApplication.run(FootballStatsApplication.class, args);
    }
}
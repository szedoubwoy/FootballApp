package com.szedou.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.szedou")
@EntityScan("com.szedou.domain")
@EnableJpaRepositories("com.szedou.domain.repository")  // Add this line
public class FootballStatsApplication {
    public static void main(String[] args) {
        SpringApplication.run(FootballStatsApplication.class, args);
    }
}
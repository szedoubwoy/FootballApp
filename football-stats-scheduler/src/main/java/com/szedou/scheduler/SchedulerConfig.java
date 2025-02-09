package com.szedou.scheduler;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.szedou.api", "com.szedou.scheduler"})
public class SchedulerConfig {
}
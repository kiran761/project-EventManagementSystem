package com.PlanItRight.NotificationManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableFeignClients
@EnableAsync
@EnableScheduling
public class NotificationManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationManagementApplication.class, args);
	}

}

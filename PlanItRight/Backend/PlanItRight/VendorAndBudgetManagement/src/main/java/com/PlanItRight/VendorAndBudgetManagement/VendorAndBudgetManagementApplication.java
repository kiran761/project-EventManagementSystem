package com.PlanItRight.VendorAndBudgetManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class VendorAndBudgetManagementApplication {

	public static void main(String[] args) {

		SpringApplication.run(VendorAndBudgetManagementApplication.class, args);
	}

}

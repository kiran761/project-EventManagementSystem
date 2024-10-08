package com.example.planirright.repository;

import com.example.planirright.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    AppUser findByEmail(String email);
    
}

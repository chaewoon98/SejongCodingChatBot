package com.example.testlocal;

import com.example.testlocal.domain.entity.User;
import com.example.testlocal.repository.UserRepository2;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles(value = "dev")
public class UserRepositoryTest {
    @Autowired
    private UserRepository2 userRepository2;

    @Test
    public void saveUserTest() {

        User user = new User(1,"17011527", "1234", "김현욱", "fofo@naver.com");
        User user2 = new User(2,"17011528", "1234", "정상벽", "fofo@naver.com");
        User savedUser = userRepository2.save(user);
        User savedUser2 = userRepository2.save(user2);
        System.out.printf(savedUser.getName());
        System.out.printf(savedUser2.getName());
        Assertions.assertEquals(user.getEmail(), savedUser.getEmail(),
                "saveUserTest");

    }

}

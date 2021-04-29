package com.dravicenne.backend.services;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class MailService {

    private final JavaMailSender javaMailSender;

    public void sendMail(String from, String dest, String body, String topic){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom(from);
        simpleMailMessage.setText(body);
        simpleMailMessage.setTo(dest);
        simpleMailMessage.setSubject(topic);

        this.javaMailSender.send(simpleMailMessage);

    }
}

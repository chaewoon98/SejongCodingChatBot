package com.example.testlocal.controller;

import com.example.testlocal.config.Constants;
import com.example.testlocal.service.CompilerService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = Constants.URL , allowCredentials = "true")

public class CompilerController {

   private final CompilerService compilerService;

    @SneakyThrows
    @PostMapping("/compiler/c")
    public String compileInC(@RequestBody Map<String, String> map){
        return compilerService.sendGcc(map.get("code"), map.get("input"));
    }

    @SneakyThrows
    @PostMapping("/compiler/python")
    public String compileInPython(@RequestBody Map<String, String> map){
        return compilerService.sendPython(map.get("code"), map.get("input"));
    }


}

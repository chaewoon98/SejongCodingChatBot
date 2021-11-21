package com.example.testlocal.service;

import com.example.testlocal.domain.vo.RenderScriptProcessor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

@Service
@RequiredArgsConstructor
public class CompilerService {
    public final String CFileName = "/home/c/test4.c";
    public final String CExeDirectory = "/home/c/hi";
    public final String PythonExeDirectory = "/home/python/test.py";
    public final String InputFileName = "test.txt";
    public final String InputCFileDirectory = "/home/c/test.txt";
    public final String InputPythonFileDirectory = "/home/python/test.txt";
    public final String PythonFileName = "test.py";

    @SneakyThrows
    public String sendGcc(String code, String input) {
        removeFile(InputCFileDirectory);
        removeFile(CFileName);
        createInputFile(input, InputCFileDirectory);
        createFile(code, CFileName);
        return executeCompiler("C");
    }

    public void createFile(String code, String fileName){
        try {
            OutputStream output = new FileOutputStream(fileName);
            byte[] bytes = code.getBytes("UTF-8");
            output.write(bytes);
        } catch (Exception e) {
            e.getStackTrace();
        }
    }

    public void createInputFile(String input, String inputFileName){
        try{
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(inputFileName, true));
            bufferedWriter.write(input);
            bufferedWriter.flush();
            bufferedWriter.close();

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public String executeCompiler(String type) throws IOException, InterruptedException, TimeoutException {
        RenderScriptProcessor compiler = new RenderScriptProcessor();

        switch (type){
            case "C":
                return executeGccCompiler(compiler);
            case "Python":
                return executePythonCompiler(compiler);
            default:
                return "error";
        }
    }

    @SneakyThrows
    public String executeGccCompiler(RenderScriptProcessor compiler){
        List createdList = new ArrayList<String>();
        createdList.add("gcc");
        createdList.add("-o");
        createdList.add("/home/c/hi");
        createdList.add(CFileName);
        compiler.execCommand(createdList, 3);

        String result="";

        File exeCFile = new File(CExeDirectory);
        File textCFile = new File(InputCFileDirectory);

        if (exeCFile.exists()) {
            List<String> executeCommendCFile = new ArrayList<String>();
            //authorizeInProcess(compiler, CExeDirectory, "777");
            executeCommendCFile.add("/bin/sh");
            executeCommendCFile.add("-c");
            executeCommendCFile.add(CExeDirectory+"<"+InputCFileDirectory);
            result = compiler.execCommand(executeCommendCFile, 3);
        }
        else {
            result = compiler.execCommand(createdList, 3);
        }

        textCFile.delete();
        exeCFile.delete();
        return result;
    }

    @SneakyThrows
    public void authorizeInProcess(RenderScriptProcessor compiler, String fileName, String chmodNumber){

        List<String> executeCommendCFile = new ArrayList<String>();

        executeCommendCFile.add("chmod");
        executeCommendCFile.add(chmodNumber);
        executeCommendCFile.add(fileName);
        compiler.execCommand(executeCommendCFile,3);

    }

    @SneakyThrows
    public String executePythonCompiler(RenderScriptProcessor compiler){

        File exePythonFile = new File(PythonExeDirectory);
        File textPythonFile = new File(InputPythonFileDirectory);
        String result;
//400 읽기, 200 쓰기, 100, 실행
        authorizeInProcess(compiler, PythonExeDirectory, "400");

        List<String> executeCommendCFile = new ArrayList<String>();

        executeCommendCFile.add("/bin/sh");
        executeCommendCFile.add("-c");
        executeCommendCFile.add("python3 "+PythonExeDirectory+"<"+InputPythonFileDirectory);
        result = compiler.execCommand(executeCommendCFile, 3);

        exePythonFile.delete();
        textPythonFile.delete();
        return result;
    }

    @SneakyThrows
    public String sendPython(String code, String input) {
        removeFile(InputPythonFileDirectory);
        removeFile(PythonExeDirectory);
        createInputFile(input, InputPythonFileDirectory);
        createFile(code, PythonExeDirectory);
        return executeCompiler("Python");
    }

    public void removeFile(String directory){
        File file = new File(directory);
        if (file.exists()) {
            if (file.isDirectory()) {
                file.delete();
            }
        }
    }

}

package com.example.testlocal.domain.vo;

import org.zeroturnaround.exec.InvalidExitValueException;
import org.zeroturnaround.exec.ProcessResult;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class RenderScriptProcessor {
    private StringBuffer buffer;
    private Process process;
    private ProcessBuilder processBuilder;
    private BufferedReader bufferedReader;
    private BufferedReader errorBufferedReader;
    private StringBuffer readBuffer;
    private StringBuffer errorReadBuffer;
    private ProcessResult processResult;

    public String execCommand(List<String> cmd, Integer time) throws IOException, InterruptedException, TimeoutException {
        String output="";

        boolean success = false;

        try {
            output = new org.zeroturnaround.exec.ProcessExecutor().directory(new File("./")).command(cmd).timeout(time, TimeUnit.SECONDS)
                    .redirectErrorStream(true)
                    .readOutput(true)
                    .execute()
                    .outputUTF8();
            success = true;

        }
        catch (InvalidExitValueException e) {
            System.out.println("Process exited with " + e.getExitValue());
            output = e.getResult().outputUTF8();
        }

        return output;
    }
}

package com.placepilot.service;

import com.placepilot.exception.BadRequestException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class ResumeParserService {

    /**
     * Extracts text from uploaded resume PDF safely using Apache PDFBox.
     */
    public String extractTextFromPdf(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Uploaded resume file cannot be empty");
        }

        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new BadRequestException("File must have a valid filename");
        }

        String lowerName = filename.toLowerCase();
        if (!lowerName.endsWith(".pdf") && !lowerName.endsWith(".txt")) {
            throw new BadRequestException("Only PDF or TXT resume files are accepted. Received: " + filename);
        }

        if (file.getSize() > 10 * 1024 * 1024) { // 10MB limit
            throw new BadRequestException("Resume file size exceeds maximum limit of 10MB");
        }

        if (lowerName.endsWith(".txt")) {
            try {
                return new String(file.getBytes(), StandardCharsets.UTF_8);
            } catch (IOException e) {
                throw new BadRequestException("Failed to read text file: " + e.getMessage());
            }
        }

        try (InputStream inputStream = file.getInputStream();
             PDDocument document = PDDocument.load(inputStream)) {

            if (document.isEncrypted()) {
                throw new BadRequestException("Encrypted or password-protected PDF files cannot be processed");
            }

            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            String text = stripper.getText(document);

            if (text == null || text.trim().isEmpty()) {
                throw new BadRequestException("Could not extract readable text from PDF. Ensure it contains text, not scanned images.");
            }

            return text.trim();
        } catch (IOException e) {
            throw new BadRequestException("Failed to parse PDF document: " + e.getMessage());
        }
    }
}


package com.placepilot.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${placepilot.jwt.secret}")
    private String jwtSecret;

    @Value("${placepilot.jwt.expiration-ms:86400000}") // 24 hours
    private long jwtExpirationMs;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof UserPrincipal principal) {
            claims.put("userId", principal.getId());
            claims.put("role", principal.getRole().name());
            claims.put("fullName", principal.getFullName());
        }
        return generateToken(claims, userDetails.getUsername());
    }

    public String generateToken(Map<String, Object> extraClaims, String username) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        if (jwtSecret == null || jwtSecret.trim().isEmpty()) {
            throw new IllegalStateException("JWT Secret is not configured. Please set the JWT_SECRET environment variable.");
        }
        byte[] keyBytes;
        try {
            // Attempt Base64 decoding
            keyBytes = io.jsonwebtoken.io.Decoders.BASE64.decode(jwtSecret.trim());
            if (keyBytes.length < 32) {
                // If Base64 decoding results in less than 256 bits, use raw UTF-8 bytes
                keyBytes = jwtSecret.trim().getBytes(StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            // Fall back to raw UTF-8 bytes if not valid Base64
            keyBytes = jwtSecret.trim().getBytes(StandardCharsets.UTF_8);
        }

        // Ensure key meets the minimum 256-bit requirement for HMAC-SHA256
        if (keyBytes.length < 32) {
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                keyBytes = md.digest(jwtSecret.trim().getBytes(StandardCharsets.UTF_8));
            } catch (NoSuchAlgorithmException ignored) {}
        }

        return Keys.hmacShaKeyFor(keyBytes);
    }
}


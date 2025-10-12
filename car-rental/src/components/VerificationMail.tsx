import { UserMail } from '@/types/mailUser';
import * as React from 'react';



export function VerificationEmail({ username,otp,otpExpiryTime}: UserMail) {
  return (
     <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', color: '#333', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111' }}>
        Welcome, {username}!
      </h1>
      <p style={{ fontSize: '16px' }}>
        Thank you for registering. Please use the following verification code to complete your registration: 
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#7c3aed' }}>{otp}</span>
      </p>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'red' }}>
        OTP will expire in {otpExpiryTime} 
      </p>
      <p style={{ fontSize: '16px' }}>
        If you did not request this code, please ignore this email.
      </p>
    </div>
  );
}
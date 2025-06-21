import { CreateAccount } from '@/types/index';

export const registerUser = async (user: CreateAccount) => {

  const payload = {
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    phoneNumber: user.phoneNumber,
  };

  try {
    console.log("Payload being sent:", payload);

    const response = await fetch('/api/User/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to register user');
    }

    const data = await response.json();
    console.log('User registered successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error registering user:', error.message || error);
    throw error;
  }
};

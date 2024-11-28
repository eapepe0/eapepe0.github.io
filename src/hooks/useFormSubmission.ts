import { useState, useCallback } from 'react';
import { debounce } from '../utils/debounce';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface UseFormSubmissionProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  t: (key: string) => string;
}

export const useFormSubmission = ({ onSuccess, onError, t }: UseFormSubmissionProps) => {
  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = t('errorName');
      isValid = false;
    }

    if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = t('errorEmail');
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = t('errorMessage');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/<[^>]*>/g, '');
  };

  const debouncedSubmit = useCallback(
    debounce(async (formData: FormData) => {
      try {
        const now = Date.now();
        const timeSinceLastSubmission = now - lastSubmissionTime;
        
        // podemos hacer un submit cada 30seg
        if (timeSinceLastSubmission < 30000) {
          throw new Error(t('errorRateLimit'));
        }

        // Chequeamos honeypot
        if (formData.honeypot) {
          throw new Error('Bot detectado');
        }

        // Sanitizamos los  inputs
        const sanitizedData = {
          name: sanitizeInput(formData.name),
          email: sanitizeInput(formData.email),
          message: sanitizeInput(formData.message),
        };

        const response = await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData),
        });

        if (!response.ok) {
          throw new Error(t('errorSubmission'));
        }

        setFormStatus({ success: true, error: false, loading: false });
        setLastSubmissionTime(now);
        onSuccess?.();
      } catch (error) {
        setFormStatus({ success: false, error: true, loading: false });
        onError?.(error instanceof Error ? error.message : t('errorSubmission'));
      }
    }, 500),
    [lastSubmissionTime, onSuccess, onError, t]
  );

  const handleSubmit = async (formData: FormData) => {
    setFormStatus({ success: false, error: false, loading: true });

    if (!validateForm(formData)) {
      setFormStatus({ success: false, error: false, loading: false });
      return;
    }

    await debouncedSubmit(formData);
  };

  return {
    formStatus,
    errors,
    handleSubmit,
  };
};
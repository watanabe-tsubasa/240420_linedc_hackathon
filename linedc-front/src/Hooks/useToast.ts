import { toast } from "sonner";
import { useCallback } from "react";

interface useToastPropsType {
  status: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message?: string;
  func?: () => void;
  label?: string;
  duration?: number;
}

export const useToast = ({ status, title, message, func, label, duration = 10000 }: useToastPropsType) => {
  const showToast = useCallback((options?: useToastPropsType) => {
    const finalOptions = {
      status: options?.status || status,
      title: options?.title || title,
      message: options?.message || message,
      func: options?.func || func,
      label: options?.label || label,
      duration: options?.duration || duration,
    };

    toast[finalOptions.status](finalOptions.title, {
      description: finalOptions.message,
      duration: finalOptions.duration,
      action: finalOptions.label ? {
        label: finalOptions.label,
        onClick: () => {
          if (finalOptions.func) {
            finalOptions.func();
          } else {
            console.log('clicked');
          }
        }
      } : undefined,
    });
  }, [status, title, message, func, label, duration]);

  return showToast;
}
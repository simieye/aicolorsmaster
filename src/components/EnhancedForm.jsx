// @ts-ignore;
import React, { useState, useCallback } from 'react';
// @ts-ignore;
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button } from '@/components/ui';
// @ts-ignore;
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// @ts-ignore;
import { useForm } from 'react-hook-form';
// @ts-ignore;

// @ts-ignore;
import { EnhancedButton } from './EnhancedButton';
// @ts-ignore;
import { LoadingSpinner } from './LoadingSpinner';
// @ts-ignore;
import { useToast } from './ToastProvider';
// @ts-ignore;

export const EnhancedForm = ({
  children,
  onSubmit,
  defaultValues = {},
  validationSchema,
  submitText = '提交',
  submittingText = '提交中...',
  successText = '提交成功',
  resetOnSuccess = true,
  showSuccessMessage = true,
  className = '',
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    success,
    error
  } = useToast();
  const form = useForm({
    defaultValues,
    resolver: validationSchema
  });
  const handleSubmit = useCallback(async data => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);
      const result = await onSubmit(data);
      if (result !== false) {
        setIsSuccess(true);
        if (showSuccessMessage) {
          success(successText);
        }
        if (resetOnSuccess) {
          form.reset();
        }

        // 3秒后重置成功状态
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      error(err.message || '提交失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, form, success, error, successText, showSuccessMessage, resetOnSuccess]);
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-6 ${className}`} {...props}>
        {children}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isSubmitting && <>
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">{submittingText}</span>
              </>}
            
            {isSuccess && <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">{successText}</span>
              </>}
          </div>

          <EnhancedButton type="submit" loading={isSubmitting} success={isSuccess} loadingText={submittingText} successText={successText} disabled={form.formState.isSubmitting}>
            {submitText}
          </EnhancedButton>
        </div>
      </form>
    </Form>;
};
export const FormFieldEnhanced = ({
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  ...props
}) => {
  return <FormField name={name} render={({
    field,
    fieldState
  }) => <FormItem>
          <FormLabel className="flex items-center space-x-1">
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} className={`
                transition-all duration-200
                ${fieldState.error ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'}
                ${fieldState.error ? 'ring-red-500' : 'ring-primary'}
              `} {...props} />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>} />;
};
export const FormProgress = ({
  currentStep,
  totalSteps,
  steps = []
}) => {
  const progress = currentStep / totalSteps * 100;
  return <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>步骤 {currentStep} / {totalSteps}</span>
        <span>{Math.round(progress)}% 完成</span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-300 ease-out" style={{
        width: `${progress}%`
      }}></div>
      </div>

      {steps.length > 0 && <div className="flex justify-between mt-4">
          {steps.map((step, index) => {
        const isCompleted = index < currentStep - 1;
        const isCurrent = index === currentStep - 1;
        return <div key={index} className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                  transition-all duration-200
                  ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                  ${isCurrent ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground' : ''}
                `}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs text-muted-foreground mt-1 text-center">
                  {step}
                </span>
              </div>;
      })}
        </div>}
    </div>;
};
export default EnhancedForm;
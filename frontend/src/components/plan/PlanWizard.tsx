import { useState } from 'react';
import StepGoalCycle from './StepGoalCycle';
import StepFrequencyEquipment from './StepFrequencyEquipment';
import StepBodyData from './StepBodyData';
import PlanPreviewCard from './PlanPreviewCard';
import Button from '../ui/Button';
import type { UserProfile } from '../../types';

interface PlanWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

type Step = 1 | 2 | 3;

export default function PlanWizard({ onComplete, onCancel }: PlanWizardProps) {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const handleNext = (data: Partial<UserProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleComplete = (data: Partial<UserProfile>) => {
    const finalData = { ...formData, ...data } as UserProfile;
    onComplete(finalData);
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              s <= step ? 'bg-accent-primary text-white' : 'bg-primary-secondary text-text-muted'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && (
        <StepGoalCycle
          initialData={formData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <StepFrequencyEquipment
          initialData={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <StepBodyData
          initialData={formData}
          onComplete={handleComplete}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

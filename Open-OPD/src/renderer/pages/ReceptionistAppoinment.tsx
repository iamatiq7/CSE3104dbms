/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import AppoinmentStep1 from 'renderer/components/AppoinmentStep1';
import AppoinmentStep2 from 'renderer/components/AppoinmentStep2';
import AppoinmentStep3 from 'renderer/components/AppoinmentStep3';
import AppoinmentStep4 from 'renderer/components/AppoinmentStep4';
import BackButton from 'renderer/components/BackButton';
import Appointment from 'renderer/types/Appointment';

const steps = ['Choose a doctor', 'Set appointment', 'Create patient', 'Print'];

function ReceptionistAppoinment() {
  const [step, setStep] = useState(1);
  const [appointment, setAppointment] = useState<Appointment>({
    // d_id: -1,
    // p_id: -1,
    // datetime: '',
    // d_name: '',
    // d_speaciality: '',
    // p_name: '',
    // p_age: -1,
    // p_gender: '',
    // p_phone: '',
  });

  const goNext = () => {
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setStep((s) => s - 1);
  };
  return (
    <div className="p-2">
      <div className="flex items-center">
        <BackButton />
        <ul className="steps flex-1">
          {steps.map((s, i) => (
            <li className={`step ${step > i ? 'step-primary' : ''}`} key={i}>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {step === 1 && (
          <AppoinmentStep1
            goNext={goNext}
            appointment={appointment}
            setAppointment={setAppointment}
          />
        )}
        {step === 2 && (
          <AppoinmentStep2
            appointment={appointment}
            setAppointment={setAppointment}
            goNext={goNext}
            goPrev={goBack}
          />
        )}
        {step === 3 && (
          <AppoinmentStep3
            appointment={appointment}
            setAppointment={setAppointment}
            goNext={goNext}
            goPrev={goBack}
          />
        )}
        {step === 4 && (
          <AppoinmentStep4
            appointment={appointment}
            setAppointment={setAppointment}
            goPrev={goBack}
          />
        )}
      </div>
    </div>
  );
}

export default ReceptionistAppoinment;

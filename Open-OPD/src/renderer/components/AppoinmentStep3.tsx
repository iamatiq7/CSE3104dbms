/* eslint-disable jsx-a11y/label-has-associated-control */
import Channels from 'Channels';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Appointment from 'renderer/types/Appointment';
import * as Yup from 'yup';

const phoneRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

interface PatientSearchResponse {
  p_id: number;
  name: string;
  age: number;
  gender: string;
  phoneNumber: string;
}

function AppoinmentStep3({
  goNext,
  goPrev,
  appointment,
  setAppointment,
}: {
  goNext: () => void;
  goPrev: () => void;
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}) {
  const [patient, setPatient] = React.useState<PatientSearchResponse | null>(
    null
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(Channels.SEARCH_PATIENT_RESPONSE, (res) => {
      console.log(res);
      setPatient((res as Array<Array<PatientSearchResponse>>)[0][0]);
      setAppointment((prev) => ({
        ...prev,
        p_id: patient?.p_id,
        p_name: patient?.name,
        p_age: patient?.age,
        p_gender: patient?.gender,
        p_phoneNumber: patient?.phoneNumber,
      }));
    });

    return () => {
      window.electron.ipcRenderer.remove(Channels.SEARCH_PATIENT_RESPONSE);
    };
  }, [
    appointment.d_id,
    patient?.age,
    patient?.gender,
    patient?.name,
    patient?.p_id,
    patient?.phoneNumber,
    setAppointment,
  ]);

  const lookup = (phone: string) => {
    window.electron.ipcRenderer.sendMessage(Channels.SEARCH_PATIENT_REQUEST, [
      { phoneNumber: phone },
    ]);
  };
  return (
    <div className="p-10">
      <div className="flex">
        <Formik
          initialValues={{ phone: '01787774055' }}
          validationSchema={Yup.object({
            phone: Yup.string()
              .matches(phoneRegx, 'Invalid phone number')
              .required('Phone number is required'),
          })}
          onSubmit={(values) => {
            console.log(values);
            lookup(values.phone);
          }}
        >
          <Form>
            <div className="flex items-center">
              <div className="flex flex-col">
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <Field
                    className="input"
                    placeholder="Enter Phone Number (Ex: 017xxxxxxxx)"
                    type="text"
                    name="phone"
                    maxLength={11}
                  />
                  <button className="btn ml-2" type="submit">
                    Lookup
                  </button>
                </div>
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="phone" />
                </label>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="my-5">
        {patient && (
          <div className="flex flex-col">
            <div className="flex gap-2">
              <label className="label">Name:</label>
              <label className="label font-bold">{patient.name}</label>
            </div>
            <div className="flex gap-2">
              <label className="label">Age:</label>
              <label className="label font-bold">{patient.age}</label>
            </div>
            <div className="flex gap-2">
              <label className="label">Gender:</label>
              <label className="label font-bold">{patient.gender}</label>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-5">
        <button type="button" className="btn btn-success" onClick={goPrev}>
          Prev
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={goNext}
          disabled={appointment?.p_id === undefined}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AppoinmentStep3;

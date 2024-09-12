/* eslint-disable jsx-a11y/label-has-associated-control */
import Channels from 'Channels';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from 'renderer/components/BackButton';
import * as Yup from 'yup';

function ManagerAdd({ table }: { table: 'receptionist' | 'doctor' | 'nurse' }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.electron.ipcRenderer.on(
      Channels.CREATE_RECEPTIONIST_RESPONSE,
      () => {
        navigate(-1);
      }
    );

    window.electron.ipcRenderer.on(Channels.CREATE_DOCTOR_RESPONSE, () => {
      navigate(-1);
    });

    return () => {
      window.electron.ipcRenderer.remove(Channels.CREATE_RECEPTIONIST_RESPONSE);
      window.electron.ipcRenderer.remove(Channels.CREATE_DOCTOR_RESPONSE);
    };
  }, [navigate]);

  const phoneRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

  return (
    <div>
      <BackButton />
      <div className="p-5">
        <h1 className="text-2xl mb-5 text-center">Add {table}</h1>
        <Formik
          initialValues={{
            phoneNumber: '',
            firstName: '',
            lastName: '',
            nid: '',
            age: '',
            gender: '',
            passcode: '',
            joiningDate: new Date().toISOString().slice(0, 10),
            userType: table,
            salary: 0,
            deskNo: 0,
            speciality: '',
            consultationFee: 0,
          }}
          validationSchema={Yup.object({
            phoneNumber: Yup.string()
              .matches(phoneRegx, 'Invalid phone number')
              .required('Phone number is required'),
            firstName: Yup.string()
              .required('Required')
              .matches(
                /^[aA-zZ\s]+$/,
                'Only alphabets are allowed for this field '
              )
              .max(50, 'Too long'),
            lastName: Yup.string()
              .required('Required')
              .matches(
                /^[aA-zZ\s]+$/,
                'Only alphabets are allowed for this field '
              )
              .max(50, 'Too long'),
            nid: Yup.number()
              .required('Required')
              .test('len', 'Invalid NID', (val) => {
                if (val && val.toString() && val.toString().length <= 20)
                  return true;
                return false;
              }),
            age: Yup.number().required('Required').max(999, 'Too long'),
            gender: Yup.string()
              .required('Required')
              .test('validGender', 'Invalid gender', (val) => {
                if (val && !(val in ['male', 'female', 'other'])) return true;
                return false;
              }),
            passcode: Yup.string()
              .required('Required')
              .min(7, 'Too short. At least 7 characters needed.')
              .max(50, 'Too long'),
            joiningDate: Yup.date().required('Required'),
            userType: Yup.string().test(
              'validUserType',
              'Invalid userType',
              (val) => {
                if (val && !(val in ['receptionist', 'doctor', 'nurse']))
                  return true;
                return false;
              }
            ),
            salary: Yup.number().required('Required'),
            deskNo: Yup.number().required('Required'),
            speciality: Yup.string(),
            consultationFee: Yup.number().required('Required'),
          })}
          onSubmit={(values) => {
            switch (table) {
              case 'receptionist':
                console.log(values);
                window.electron.ipcRenderer.sendMessage(
                  Channels.CREATE_RECEPTIONIST_REQUEST,
                  [values]
                );
                break;
              case 'doctor':
                console.log(values);
                window.electron.ipcRenderer.sendMessage(
                  Channels.CREATE_DOCTOR_REQUEST,
                  [values]
                );
                break;
              case 'nurse':
                console.log(values);
                break;
              default:
                break;
            }
          }}
        >
          <Form className="flex flex-col max-w-xl mx-auto">
            <label htmlFor="phoneNumber" className="label">
              Phone Number
            </label>
            <Field
              className="input"
              placeholder="Enter Phone Number (Ex: 017xxxxxxxx)"
              type="text"
              name="phoneNumber"
              maxLength={11}
            />
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="phoneNumber" />
            </label>
            <div className="flex w-full gap-2">
              <div className="flex-1">
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <Field
                  className="input w-full"
                  placeholder="Enter First Name"
                  type="text"
                  name="firstName"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="firstName" />
                </label>
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <Field
                  className="input w-full"
                  placeholder="Enter Last Name"
                  type="text"
                  name="lastName"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="lastName" />
                </label>
              </div>
            </div>

            <label htmlFor="nid" className="label">
              NID Number
            </label>
            <Field
              className="input"
              placeholder="Enter NID Number"
              type="text"
              name="nid"
              maxLength={20}
            />
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="nid" />
            </label>

            <label htmlFor="age" className="label">
              Age
            </label>
            <Field
              className="input"
              placeholder="Enter Age"
              type="number"
              name="age"
              maxLength={3}
            />
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="age" />
            </label>

            <label htmlFor="gender" className="label">
              Gender
            </label>

            <Field as="select" className="select w-full max-w-xs" name="gender">
              <option disabled selected>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="gender" />
            </label>

            <label htmlFor="passcode" className="label">
              Passcode
            </label>
            <Field
              className="input"
              placeholder="Enter Passcode"
              type="password"
              name="passcode"
              maxLength={50}
            />
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="passcode" />
            </label>

            <label htmlFor="joiningDate" className="label">
              Joining Date
            </label>
            <Field
              className="input "
              placeholder="Joining Date"
              type="date"
              name="joiningDate"
            />
            <label className="label-text-alt text-error p-2">
              <ErrorMessage name="joiningDate" />
            </label>

            <label htmlFor="userType" className="label">
              User Type
            </label>
            <Field
              className="input disabled:border disabled:border-dashed disabled:border-gray-400"
              placeholder="User Type"
              type="text"
              name="userType"
              disabled
            />

            <h1 className="my-5 text-2xl border-b border-dashed border-gray-400">
              {table.toUpperCase()} Info
            </h1>

            {table === 'receptionist' && (
              <>
                <label htmlFor="salary" className="label">
                  Salary
                </label>
                <Field
                  className="input"
                  placeholder="Enter Salary"
                  type="number"
                  name="salary"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="salary" />
                </label>

                <label htmlFor="deskNo" className="label">
                  Desk Number
                </label>
                <Field
                  className="input"
                  placeholder="Enter Desk Number"
                  type="number"
                  name="deskNo"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="deskNo" />
                </label>
              </>
            )}

            {table === 'doctor' && (
              <>
                <label htmlFor="speciality" className="label">
                  Speciality
                </label>
                <Field
                  className="input"
                  placeholder="Enter Speciality"
                  type="text"
                  name="speciality"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="speciality" />
                </label>

                <label htmlFor="consultationFee" className="label">
                  Consultation Fee
                </label>
                <Field
                  className="input"
                  placeholder="Enter Consultation Fee"
                  type="number"
                  name="consultationFee"
                />
                <label className="label-text-alt text-error p-2">
                  <ErrorMessage name="consultationFee" />
                </label>
              </>
            )}

            <button className="btn btn-primary mt-5" type="submit">
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ManagerAdd;

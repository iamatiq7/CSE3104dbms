/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Channels from 'Channels';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Manager from 'renderer/types/Manager';
import User from 'renderer/types/User';
import * as Yup from 'yup';

interface LoginResponse extends User {
  m_id?: number;
  designation?: string;
}

enum UserTypes {
  RECEPTIONIST = 'Receptionist',
  DOCTOR = 'Doctor',
  MANAGER = 'Manager',
}

const LoginForm = () => {
  const [userType, setUserType] = useState<UserTypes>(UserTypes.RECEPTIONIST);
  const navigate = useNavigate();

  useEffect(() => {
    if (window?.isLoggedin) {
      navigate(`/${window?.user?.user_type}`);
    }
    window.electron.ipcRenderer.on(Channels.LOGIN_RESPONSE, (res) => {
      console.log(res);
      const {
        first_name,
        last_name,
        phone_number,
        gender,
        nid,
        joining_date,
        user_key,
        user_type,
        age,
        u_id,
      } = (res as Array<Array<LoginResponse>>)[0][0];

      const user: User = {
        u_id: u_id as number,
        first_name: first_name || '',
        last_name: last_name || '',
        phone_number: phone_number || '',
        joining_date: joining_date || '',
        gender: gender || '',
        nid: nid || '',
        user_key: user_key || -1,
        user_type: user_type || '',
        age: age || 0,
      };

      window.user = user;
      window.isLoggedin = true;

      navigate(`/${window?.user?.user_type}`, { replace: true });
    });

    return () => {
      window.electron.ipcRenderer.remove(Channels.LOGIN_RESPONSE);
    };
  }, [navigate]);

  const phoneRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

  return (
    <Formik
      initialValues={{
        identifier: '01521517534',
        password: '1234567',
      }}
      validationSchema={Yup.object({
        identifier: Yup.string()
          .matches(phoneRegx, 'Phone number is not valid')
          .required('Phone number is required'),
        password: Yup.string()
          .min(7, 'Password must be at least 7 characters')
          .required('Password is required'),
      })}
      onSubmit={(values) => {
        window.electron.ipcRenderer.sendMessage(Channels.LOGIN_REQUEST, [
          { ...values, userType },
        ]);
      }}
    >
      <>
        <div className="flex items-center gap-10">
          <h1 className="text-3xl text-center">Login As</h1>
          <div className="tabs my-7">
            <button
              className={`tab tab-bordered ${
                userType === UserTypes.RECEPTIONIST ? 'tab-active' : ''
              }`}
              type="button"
              onClick={() => setUserType(UserTypes.RECEPTIONIST)}
            >
              Receptionist
            </button>
            <button
              className={`tab tab-bordered ${
                userType === UserTypes.DOCTOR ? 'tab-active' : ''
              }`}
              type="button"
              onClick={() => setUserType(UserTypes.DOCTOR)}
            >
              Doctor
            </button>
            <button
              className={`tab tab-bordered ${
                userType === UserTypes.MANAGER ? 'tab-active' : ''
              }`}
              type="button"
              onClick={() => setUserType(UserTypes.MANAGER)}
            >
              Manager
            </button>
          </div>
        </div>
        <Form className="flex flex-col w-full max-w-md">
          <label className="label" htmlFor="identifier">
            Phone Number
          </label>
          <Field
            className="input"
            placeholder="Enter Your Phone Number"
            type="text"
            name="identifier"
          />
          <label className="label-text-alt text-error p-2">
            <ErrorMessage name="identifier" />
          </label>

          <label className="label" htmlFor="identifier">
            Password
          </label>
          <Field
            className="input"
            placeholder="Enter Your Password"
            type="password"
            name="password"
          />
          <label className="label-text-alt text-error p-2">
            <ErrorMessage name="password" />
          </label>

          <button className="btn btn-primary mt-5" type="submit">
            Login
          </button>
        </Form>
      </>
    </Formik>
  );
};

export default LoginForm;

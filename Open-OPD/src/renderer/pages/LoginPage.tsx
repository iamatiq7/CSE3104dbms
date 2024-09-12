import LoginForm from 'renderer/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-5xl mb-10">Open OPD</h1>
      <LoginForm />
    </div>
  );
}

import { Button, Form, Input, message } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ setIsLoginForm }: { setIsLoginForm: any }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleOnFinish = async (values: {
    email: string;
    password: string;
    phone: string;
    name: string;
  }) => {
    try {
      await register(values.email, values.password, values.phone, values.name);
      message.success('Register successful');
      navigate('/user');
    } catch (error) {
      message.error("Cannot create account!")
    }
  };

  return (
    <div
      style={{
        width: '50%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Sign up</h1>

      <Form
        name="login_form"
        onFinish={handleOnFinish}
        layout="vertical"
        initialValues={{
          email: '',
          password: '',
          name: '',
          phone: '',
        }}
        autoComplete="false"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your email valid phone number',
            },
          ]}
        >
          <Input type="phone" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: '100%', fontWeight: 'bold', background: '#008000' }}
            type="primary"
            htmlType="submit"
          >
            Sign up
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Already have an account ?</p>
          <Button
            onClick={() => {
              setIsLoginForm(true);
            }}
            type="link"
          >
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;

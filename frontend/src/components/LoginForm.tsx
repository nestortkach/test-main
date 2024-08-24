import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm = ({setIsLoginForm}: {setIsLoginForm: any}) => {
  const { login } = useAuth();
  const navigate = useNavigate()
  
  const handleOnFinish = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      await login(values.email, values.password);
      message.success('Login successful');
      navigate('/user');
    } catch (error) {
      message.error("Invalid credential");
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
      <h1 style={{marginBottom: "20px"}}>Sign in</h1>

      <Form
        name="login_form"
        onFinish={handleOnFinish}
        layout="vertical"
        initialValues={{
          email: '',
          password: '',
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button style={{width: "100%", fontWeight: "bold"}} type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>Here at the first time ?</p>
          <Button onClick={() => {setIsLoginForm(false)}} type="link">Create an acount</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

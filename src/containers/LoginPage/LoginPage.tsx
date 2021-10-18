import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Button } from 'components/Button';
import { initializationSelector, validationSelector } from 'containers/selectors';
import { useSelector } from 'react-redux';
import { View } from 'wiloke-react-core';
import parser from 'html-react-parser';
import { useActionValidateApp } from './actions/actionLogin';

export const Login = () => {
  const validate = useActionValidateApp();
  const { baseUrl } = useSelector(initializationSelector);
  const { loginStatus, message } = useSelector(validationSelector);

  const onFinish = (values: any) => {
    const { username, password } = values;

    if (baseUrl) {
      validate.request({ username, password, url: baseUrl });
    }
  };

  return (
    <View
      backgroundColor="light"
      css={{
        width: '100%',
        height: '100%',
        padding: '20px',
        maxWidth: '760px',
        margin: '0 auto',
      }}
    >
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
        <FormItem label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </FormItem>

        <FormItem
          style={{ marginBottom: '4px' }}
          label="Application Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </FormItem>

        {message && (
          <View row>
            <View columns={[12, 4, 4]} />
            <View columns={[12, 8, 8]} css={{ paddingLeft: '5px', marginBottom: '5px' }} color="tertiary">
              {parser(message)}
            </View>
          </View>
        )}

        <View row css={{ marginBottom: '24px' }}>
          <View columns={[4, 4, 4]} />
          <View css={{ paddingLeft: '4px' }} columns={[8, 8, 8]}>
            <View tagName="a" backgroundColor="light" color="primary" target="_blank" href="https://docs.wiloke.com/wookit/getting-started">
              Learn how to setup this feature
            </View>
          </View>
        </View>

        <FormItem wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loginStatus === 'loading'} size="small" type="submit" radius={6}>
            Submit
          </Button>
        </FormItem>
      </Form>
    </View>
  );
};

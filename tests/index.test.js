import React from 'react';
import TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';

import ReactMuiLoginRegister, {
  PROVIDER_TWITTER, PROVIDER_GITHUB, PROVIDER_FACEBOOK
} from '../src';
import ProviderChoices from '../src/ProviderChoices';
import LoginRegisterError from '../src/components/LoginRegisterError';
import Login from '../src/Login';
import Register from '../src/Register';

test('render default', () => {
  const component = TestRenderer.create(
      <ReactMuiLoginRegister transitionTimeout={0}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('expected default provider buttons', () => {
  const rendered = TestRenderer.create(
      <ReactMuiLoginRegister transitionTimeout={0}/>,
  );

  const testInstance = rendered.root;

  const providerChoices = testInstance.findByType(ProviderChoices);
  const providerButtons = providerChoices.findAll(instance => instance.type.name === "ProviderButton");
  expect(providerButtons).toHaveLength(3);

  const providers = providerButtons.map(b => b.props.provider);
  expect(providers).toEqual(expect.arrayContaining([PROVIDER_GITHUB, PROVIDER_FACEBOOK, PROVIDER_TWITTER]));
});

test('expected with given providers', () => {
  const rendered = TestRenderer.create(
      <ReactMuiLoginRegister transitionTimeout={0}
                             providers={[PROVIDER_FACEBOOK, PROVIDER_GITHUB]}
      />,
  );

  const testInstance = rendered.root;

  const providerChoices = testInstance.findByType(ProviderChoices);
  const providerButtons = providerChoices.findAll(instance => instance.type.name === "ProviderButton");
  expect(providerButtons).toHaveLength(2);

  const providers = providerButtons.map(b => b.props.provider);
  expect(providers).toEqual(expect.arrayContaining([PROVIDER_GITHUB, PROVIDER_FACEBOOK]));
});

test('with a login error', () => {
  const rendered = TestRenderer.create(
      <ReactMuiLoginRegister transitionTimeout={0} loginFailed='Login error message'/>,
  );

  expect(rendered.root.findByType(Login)
  .findByType(LoginRegisterError).props.message).toEqual('Login error message');
});

describe('dom testing', () => {
  beforeAll(() => {
    configure({adapter: new Adapter()});
  });

  test('with a register error', () => {

    const rendered = mount(
        <ReactMuiLoginRegister transitionTimeout={0} registerFailed='Register error message'/>,
    );

    rendered.find('Tab').find('[label="Register"]').simulate('click');

    const errorInstance = rendered.find(Register).find(LoginRegisterError);

    expect(errorInstance).toHaveLength(1);
    expect(errorInstance.props().message).toEqual('Register error message');
  });

  test('with default, local enabled', () => {

    const rendered = mount(
      <ReactMuiLoginRegister transitionTimeout={0}/>,
    );

    expect(rendered.find('LocalUserLogin')).toHaveLength(1);
  });

  test('with local disabled', () => {

    const rendered = mount(
        <ReactMuiLoginRegister transitionTimeout={0} disableLocal={true}/>,
    );

    expect(rendered.find('LocalUserLogin')).toHaveLength(0);
  });

  test('with default, register enabled', () => {

    const rendered = mount(
      <ReactMuiLoginRegister transitionTimeout={0}/>,
    );

    const registerTab = rendered.find('Tab').find('[label="Register"]');
    expect(registerTab).toHaveLength(1);
    const tabs = rendered.find('Tabs');
    expect(tabs).toHaveLength(1);
  });

  test('with register disabled', () => {

    const rendered = mount(
        <ReactMuiLoginRegister transitionTimeout={0} disableRegister={true}/>,
    );

    const registerTab = rendered.find('Tab').find('[label="Register"]');
    expect(registerTab).toHaveLength(0);
    const tabs = rendered.find('Tabs');
    expect(tabs).toHaveLength(0);
  });
});


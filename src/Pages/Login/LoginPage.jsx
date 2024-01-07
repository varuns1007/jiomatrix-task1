import React from 'react';


import './LoginPage.css';
import Input from '../../Components/Input/Input';

const LoginPage = () => {
  return (
    <div>
      <section className="box">
        <header>Login</header>
        <div className="form-body">
          <form action="" method="post">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              icon="MdAlternateEmail"
            />
            <Input
              type="text"
              name="password"
              id="password"
              placeholder="password"
              icon="MdAlternateEmail"
            />

            <Input
              type="submit"
              icon="MdAlternateEmail"
            />



            
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage
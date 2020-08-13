import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export const SignIn: FunctionComponent = () => {
    return (
        <div>
            <Form>
                <Input type="email" placeholder="email" />
                <Input type="password" placeholder="password" />
                <Button>Sign in</Button>
            </Form>
            <Link to="/signUp">Don't have an account?</Link>
        </div>
    );
}

export default SignIn;
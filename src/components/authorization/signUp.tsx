import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export const SignUp: FunctionComponent = () => {
    return (
        <div>
            <Form>
                <Input type="email" placeholder="email" />
                <Input type="password" placeholder="password" />
                <Input type="password" placeholder="password again" />

                <Button>Sign up</Button>
            </Form>
            <Link to="/signIn">Already have an account?</Link>
        </div>
    );
}

export default SignUp;
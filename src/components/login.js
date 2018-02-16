import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends Component {
  renderField(field){
    const {meta : { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}   // any event can be communicated to field (pre-generated event handlers)
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
 }

 onSubmit(values){
    this.props.userLogin(values, () => {
    
  } );
}

render() {
    const { handleSubmit } = this.props;

    return (
      <div className="LoginForm">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Username / Email"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            component={this.renderField}
          />      
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/signup" className="btn btn-danger signup">Signup</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  // Validate the input from 'values'
  if(!values.username || values.username.length < 3){
    errors.username = "Enter a Username that has atleast 3 characters!";
  }

  if(!values.password){
    errors.password = "Enter Password";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form asssumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'Login'        // make sure the string you assign is unique.
})(
    connect(null, { userLogin })(Login)
);                            // This is helpful whenever we want to merge state from multiple forms
                              // in a given time.

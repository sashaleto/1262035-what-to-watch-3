import React, {PureComponent} from 'react';

const withValidation = (Component) => {
  class WithValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFormValid: false,
      };

      this.handleFormValidation = this.handleFormValidation.bind(this);
    }

    handleFormValidation(validationStatus) {
      this.setState({
        isFormValid: validationStatus,
      });
    }

    render() {
      const {isFormValid} = this.state;

      return (
        <Component
          {...this.props}
          validationStatus={isFormValid}
          onValidateForm={this.handleFormValidation}
        />
      );
    }
  }

  WithValidation.propTypes = {};

  return WithValidation;
};

export default withValidation;

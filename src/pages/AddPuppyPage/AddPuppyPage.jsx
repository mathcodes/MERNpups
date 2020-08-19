import React, {Component} from 'react';

class AddPuppyPage extends Component {
  state = {
    invalidForm: true,
    formData: {
      name: '',
      breed: 'Mixed',
      age: '0'
    }
  };

  formRef = React.createRef();
  
  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // We will write the handleAddPuppy function in our App.js after this step...
    this.props.handleAddPuppy(this.state.formData);
  };

  render() {
    return (
      <>
        <h1>Add your favorite musicians. Find Comparisons by reading up on them and adding notes,</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Musician's Name (required)</label>
            <input
              className="form-control"
              name="name"
              value={this.state.formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Eras (required)</label>
            <select className="form-control" name="breed" value={this.state.formData.breed} onChange={this.handleChange}>
              <option>40s - 50s</option>
              {this.props.breeds.map((breed, idx) => <option key={breed.id} value={breed.name}>{breed.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Pup's Age</label>
            <input
              className="form-control"
              name="age"
              value={this.state.formData.age}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            ADD PUPPY
          </button>
        </form>
      </>
    );
  }
}

export default AddPuppyPage;
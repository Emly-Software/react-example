import logo from './logo.svg';
import './App.css';
import TextBox from './components/TextBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
      </div>
      </header>
    </div>
  );
}

export default App;

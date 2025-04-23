import logo from './logo.svg';
import './App.css';
import ImageClickCapture from './components/ImageClickCapture'
import ImageMarkerOverlay from './components/MarkCoordinates';

function App() {
  return (
    <div className="App">
     <ImageClickCapture />
     <ImageMarkerOverlay/>
    </div>
  );
}

export default App;

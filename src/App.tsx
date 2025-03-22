import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { NewTask } from './pages/NewTask';
import { EditTask } from './pages/EditTask';

const App =() => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
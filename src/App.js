import LoginForm from './LoginForm';
import OrganizationPage from './OrganizationPage';
import ParticipationPage from './ParticipationPage';
import ManagingPage from './ManagingPage';
import StockPage from './StockPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
//import './style.css';
import OrganizerForm from './OrganizerForm';
import OrganizerDashboard from './OrganizerDashboard';
import DisplayOrganizer from './DisplayOrganizer';
import DeleteOrganizer from './DeleteOrganizer';

import ParticipantForm from './ParticipantForm';
import ParticipantDashboard from './ParticipantDashboard';
import DisplayParticipant from './DisplayParticipant';
import DeleteParticipant from './DeleteParticipant';

import Eventorg from './Eventorg';
import Eventpart from './Eventpart';
import Displayvendor from './Displayvendor';

import EventForm from './EventForm';
import EventVendorForm from './EventVendorForm';
import RegistrationForm from './RegistrationForm';
import ResourceForm from './ResourceForm';
import ScheduleForm from './ScheduleForm';
import TaskForm from './TaskForm';
import VendorForm from './VendorForm';
import VenueForm from './VenueForm';
import EventList from './EventList';


function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Event Management System</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            {/* Other navigation links */}
                        </ul>
                    </nav>
                </header>
                <main>
                    <Routes>
                        {/*<Route path="/" element={<h2>Welcome to the Event Management System</h2>} />*/}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/organization" element={<OrganizationPage />} />
                        <Route path="/participation" element={<ParticipationPage />} />
                        <Route path="/managing/*" element={<ManagingPage />} />
                        <Route path="/stock" element={<StockPage />} />
                        
                        <Route path="/organizer/*" element={<OrganizerDashboard />} />
                        <Route path="/add-organizer" element={<OrganizerForm />} />
                        <Route path="/display-organizer" element={<DisplayOrganizer />}/>
                        <Route path="/delete-organizer" element={<DeleteOrganizer />} />

                        <Route path="/participant" element={<ParticipantDashboard />} />
                        <Route path="/add-participant" element={<ParticipantForm />} />
                        <Route path="/display-participant" element={<DisplayParticipant />}/>
                        <Route path="/delete-participant" element={<DeleteParticipant />} />

                        <Route path="/Eventorg" element={<Eventorg />} />
                        <Route path="/Eventpart" element={<Eventpart />} />
                        <Route path="/Displayvendor" element={<Displayvendor />}/>

                        <Route path="/event" element={<EventForm />} />
                        <Route path="/vendor" element={<VendorForm />} />
                        <Route path="/event-vendor" element={<EventVendorForm />} />
                        <Route path="/registration" element={<RegistrationForm />} />
                        <Route path="/resource" element={<ResourceForm />} />
                        <Route path="/schedule" element={<ScheduleForm />} />
                        <Route path="/task" element={<TaskForm />} />
                        <Route path="/venue" element={<VenueForm />} />
                        <Route path="/event-list" element={<EventList />} />
                        {/* Other form routes */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

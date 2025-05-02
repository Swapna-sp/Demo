'use client';

import React, { useState } from 'react';
import {
  Search, Calendar, User, Phone, Mail, Plane, Hotel, UserCircle, Gift,
} from 'lucide-react';

const tabs = [
  { id: 'holiday', label: 'Holiday Package', icon: <Gift className="w-4 h-4" /> },
  { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
  { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
  { id: 'account', label: 'My Account', icon: <UserCircle className="w-4 h-4" /> },
];

const quickSearchTags = [
  'Malaysia', 'Maldives', 'Nepal', 'Dubai', 'Thailand',
  'Mauritius', 'Himachal Pradesh', 'Punjab', 'North East',
];

const TravelSearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('holiday');
  const [search, setSearch] = useState('');
  const [pax, setPax] = useState('1 Adult');
  const [rooms, setRooms] = useState('1 Room');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0]; 
    return today;
  });

  const handleSubmit = async () => {
    const payload = {
      type: activeTab,
      search,
      travelDate,
      pax,
      rooms,
      phone,
      email,
    };
  
    try {
      const response = await fetch(
        "https://us-central1-fir-hosting-2a037.cloudfunctions.net/submitSearch", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Success:", data);
      alert("Data submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting data:", error.message || error);
      alert("Submission failed.");
    }
  };
  

  return (
    <div className="bg-[#1C1A2E] text-white min-h-[320px] py-10">
   
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-full text-sm transition-all ${
              activeTab === tab.id ? 'bg-[#B5F5A4] text-black' : 'bg-[#2A2745]'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>

      
      <div className="bg-white text-black mx-auto rounded-xl p-6 w-[95%] max-w-[1600px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Find</label>
            <div className="border rounded-md px-3 py-2 flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search here.."
                className="outline-none flex-1 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">From Packages</p>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">When</label>
            <div className="border rounded-md px-3 py-2 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                className="outline-none text-sm flex-1 bg-transparent"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Pax</label>
            <div className="border rounded-md px-3 py-2 flex items-start space-x-2">
              <User className="w-4 h-4 text-gray-400 mt-1" />
              <div className="flex flex-col gap-1">
                <input
                  className="text-sm outline-none"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                />
                <input
                  className="text-xs text-gray-500 outline-none"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>
            </div>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="border rounded-md px-3 py-2 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter phone"
                className="outline-none flex-1 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="border rounded-md px-3 py-2 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email"
                className="outline-none flex-1 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="text-right mb-6">
          <button
            onClick={handleSubmit}
            className="bg-[#1C1A2E] text-white px-6 py-2 rounded-md shadow hover:bg-[#2A2745] transition-all"
          >
            Submit
          </button>
        </div>

 
        <div className="flex flex-wrap gap-2">
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              className="border px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelSearchSection;
